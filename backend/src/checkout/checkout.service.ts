import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { BillingService } from '../orders/billing.service';
import { ProductService } from '../orders/product.service';
import { ShippingService } from '../orders/shipping.service';
import { MailService } from 'src/mail/mail.service';
import axios from 'axios';
import * as crypto from 'crypto';

import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(
    private usersService: UsersService,
    private orderService: OrdersService,
    private billingService: BillingService,
    private productService: ProductService,
    private shippingService: ShippingService,
    private mailService: MailService,
  ) {
    this.stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
      apiVersion: '2022-11-15',
    });
  }

  async GelatoCreateOrder(userId: Number, order: any) {
    const shippingAddress = order.shipping;
    const billingAddress = order.billing;
    const productDetails = order.product;

    const paypload = {
      orderType: 'order',
      orderReferenceId: order.orderId,
      customerReferenceId: userId,
      currency: 'USD',
      items: [
        {
          itemReferenceId: productDetails.itemReferenceId,
          productUid: productDetails.productUid,
          files: [
            {
              type: 'default',
              url: productDetails.ImgUrl,
            },
          ],
          quantity: productDetails.quantity,
        },
      ],
      shipmentMethodUid:
        order.shippingType === 'Free Shipping' ? 'normal' : 'express',

      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        addressLine1: shippingAddress.address,
        state: shippingAddress.state,
        city: shippingAddress.city,
        postCode: shippingAddress.zip,
        country: shippingAddress.country,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
      },
      returnAddress: {
        companyName: process.env.APP_NAME,
        addressLine1: process.env.ADDRESS_LINE1,
        addressLine2: process.env.ADDRESS_LINE2,
        state: process.env.STATE,
        city: process.env.CITY,
        postCode: process.env.POSTCODE,
        country: process.env.COUNTRY_CODE,
        email: process.env.EMAIL,
        phone: process.env.PHONE,
      },
      metadata: [
        {
          key: 'keyIdentifier1',
          value: 'keyValue1',
        },
      ],
    };
    try {
      const response = await axios.post(
        'https://order.gelatoapis.com/v4/orders',
        paypload,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.GELATO_API,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async create_checkout(
    user: User,
    body: any,
  ): Promise<Stripe.Checkout.Session> {
    // add card here
    const Card = body.card;
    const ConfirmationNumber = crypto.randomBytes(16).toString('hex');

    const customer = await this.stripe.customers.create({
      metadata: {
        userId: user.id,
        card: JSON.stringify(body.card),
        shippingAddress: JSON.stringify(body.shippingAddress),
        billingAddress: JSON.stringify(body.billingAddress),
        ConfirmationNumber: ConfirmationNumber,
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: Card.product_name,
              images: [
                'https://cdn.sanity.io/images/69l8b8xl/production/377bad2c7545e1c4968251fe0772acf08a9a0276-2245x1587.jpg',
              ],
              description: Card.description,
            },
            unit_amount: Card.price * 100,
          },
          quantity: Card.quantity,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shipping Cost',
            },
            unit_amount: Card.shippingCost * 100,
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_DOMAIN}/confirmation?session_id=${ConfirmationNumber}`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}/home/dashboard`,
    });
    return session;
  }

  async CreateOrder(data: any, customer: any): Promise<any> {
    const user = await this.usersService.findOne({
      id: customer.metadata.userId,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let Card;
    let ShippingAddress;
    let BillingAddress;
    let ConfirmationNumber;

    if ('metadata' in customer) {
      Card = JSON.parse(customer.metadata.card);
      ShippingAddress = JSON.parse(customer.metadata.shippingAddress);
      BillingAddress = JSON.parse(customer.metadata.billingAddress);
      ConfirmationNumber = customer.metadata.ConfirmationNumber;
    }

    const product = await this.productService.create({
      name: Card.product_name,
      size: Card.size,
      price: Card.total,
      ImgUrl: Card.ImgUrl,
      type: Card.type,
      itemReferenceId: Card.itemReferenceId,
      quantity: Card.quantity,
      productUid: Card.productUid,
    });

    const billing = await this.billingService.create({
      firstName: BillingAddress.firstName,
      lastName: BillingAddress.lastName,
      address: BillingAddress.address,
      city: BillingAddress.city,
      state: BillingAddress.state,
      zip: BillingAddress.zip,
      country: BillingAddress.country,
    });

    const shipping = await this.shippingService.create({
      firstName: ShippingAddress.firstName,
      lastName: ShippingAddress.lastName,
      address: ShippingAddress.address,
      city: ShippingAddress.city,
      state: ShippingAddress.state,
      zip: ShippingAddress.zip,
      country: ShippingAddress.country,
      email: ShippingAddress.email,
      phone: ShippingAddress.phone,
    });

    const order = await this.orderService.create(customer.metadata.userId, {
      status: 'Confirmed',
      paymentMethod: 'Credit Card',
      subtotal: data.amount_subtotal / 100,
      total: data.amount_total / 100,
      shippingType:
        Card.shippingCost === 0 ? 'Free Shipping' : 'Exress Shipping',
      confirmationNumber: ConfirmationNumber,
      billing: billing,
      shipping: shipping,
      product: product,
    });

    try {
      await this.GelatoCreateOrder(customer.metadata.userId, order);
    } catch (err) {
      console.log(err);
    }
  }

  async webhook(req: Request, body: any): Promise<any> {
    const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;
    let event;

    try {
      // Get the raw body of the request

      const payload = req.body;
      const payloadString = JSON.stringify(payload, null, 2);
      const header = this.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret as string,
      });

      event = this.stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret,
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return HttpStatus.BAD_REQUEST;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        const data = body.data.object;
        this.stripe.customers
          .retrieve(checkoutSessionCompleted.customer)
          .then((customer) => {
            this.CreateOrder(data, customer).catch((err) => {
              console.log(err);
            });
          })
          .catch((err) => {
            console.log(err);
          });

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return HttpStatus.OK;
  }

  async paypal_checkout(user: User, body: any): Promise<any> {
    const Card = body.card;
    const ShippingAddress = body.shippingAddress;
    const BillingAddress = body.billingAddress;
    const ConfirmationNumber = crypto.randomBytes(16).toString('hex');

    const product = await this.productService.create({
      name: Card.product_name,
      size: Card.size,
      price: Card.total,
      ImgUrl: Card.ImgUrl,
      type: Card.type,
      itemReferenceId: Card.itemReferenceId,
      quantity: Card.quantity,
      productUid: Card.productUid,
    });

    const billing = await this.billingService.create({
      firstName: BillingAddress.firstName,
      lastName: BillingAddress.lastName,
      address: BillingAddress.address,
      city: BillingAddress.city,
      state: BillingAddress.state,
      zip: BillingAddress.zip,
      country: BillingAddress.country,
    });

    const shipping = await this.shippingService.create({
      firstName: ShippingAddress.firstName,
      lastName: ShippingAddress.lastName,
      address: ShippingAddress.address,
      city: ShippingAddress.city,
      state: ShippingAddress.state,
      zip: ShippingAddress.zip,
      country: ShippingAddress.country,
      email: ShippingAddress.email,
      phone: ShippingAddress.phone,
    });

    const order = await this.orderService.create(user.id, {
      status: 'Confirmed',
      paymentMethod: 'Paypal',
      subtotal: Card.total,
      total: Card.total,
      shippingType:
        Card.shippingCost === 0 ? 'Free Shipping' : 'Exress Shipping',
      confirmationNumber: ConfirmationNumber,
      billing: billing,
      shipping: shipping,
      product: product,
    });

    try {
      await this.GelatoCreateOrder(user.id, order);
      return {
        url: `${process.env.FRONTEND_DOMAIN}/confirmation?session_id=${ConfirmationNumber}`,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async orderStatusHook(body: any): Promise<any> {
    const orderId = body.orderReferenceId;
    const order = await this.orderService.findOne({
      orderId: orderId,
    });
    const orderStatus = body.fulfillmentStatus;
    const gelatoOrderId = body.orderId;
    if (order) {
      order.status = orderStatus;
      order.gelatoOrderId = gelatoOrderId;
      await order.save();
      if (orderStatus === 'created') {
        await this.mailService.orderConfirmation({
          to: order.shipping.email,
          data: {
            order: order,
          },
        });
      }
      if (orderStatus === 'canceled' || orderStatus === 'failed') {
        await this.mailService.orderCanceled({
          to: order.shipping.email,
          data: {
            order: order,
          },
        });
      }
    } else {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async itemStatusHook(body: any): Promise<any> {
    const orderId = body.orderReferenceId;
    const order = await this.orderService.findOne({
      orderId: orderId,
    });
    const status = body.status;
    const gelatoOrderId = body.orderId;
    if (order) {
      order.status = status;
      order.gelatoOrderId = gelatoOrderId;
      await order.save();
    } else {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async trackingCodeHook(body: any): Promise<any> {
    const orderId = body.orderReferenceId;
    const order = await this.orderService.findOne({
      orderId: orderId,
    });
    const trackingCode = body.trackingCode;
    const trackingUrl = body.trackingUrl;
    const gelatoOrderId = body.orderId;
    const shipmentMethodName = body.shipmentMethodName;
    if (order) {
      order.trackingCode = trackingCode;
      order.trackingUrl = trackingUrl;
      order.gelatoOrderId = gelatoOrderId;
      order.shipmentMethodName = shipmentMethodName;
      await order.save();

      await this.mailService.orderShipped({
        to: order.shipping.email,
        data: {
          order: order,
        },
      });
    } else {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async stockRegionAvailabilityHook(body: any): Promise<any> {}

  async product_webhook(req: Request, body: any): Promise<any> {
    console.log('Gelato webhook body: ', body);

    const object = body.object;

    try {
      if (object === 'orderStatus') {
        await this.orderStatusHook(body);
      } else if (object === 'itemStatus') {
        await this.itemStatusHook(body);
      } else if (object === 'trackingCode') {
        await this.trackingCodeHook(body);
      } else if (object === 'stockRegionAvailability') {
        await this.stockRegionAvailabilityHook(body);
      } else {
        throw new HttpException('Invalid webhook', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async cancel_order(body: any): Promise<any> {
    const orderId = body.orderId;
    try {
      const response = await axios.post(
        `https://order.gelatoapis.com/v4/orders/${orderId}:cancel`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.GELATO_API,
          },
        },
      );

      const order = await this.orderService.findOne({
        gelatoOrderId: orderId,
      });

      if (order) {
        order.status = 'Canceled';
        await order.save();
      }

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
