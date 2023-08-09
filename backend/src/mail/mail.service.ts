import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>) {
    const i18n = I18nContext.current();

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: await i18n.t('common.confirmEmail'),
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
        mailData.data.hash
      } ${await i18n.t('common.confirmEmail')}`,
      template: 'activation',
      context: {
        companyLogo: 'https://i.ibb.co/0XK0Vw6/logo.png',
        companyName: 'Image To Art',
        url: `${this.configService.get('app.frontendDomain')}/confirm-email/${
          mailData.data.hash
        }`,
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>) {
    const i18n = I18nContext.current();

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: await i18n.t('common.resetPassword'),
      text: `${this.configService.get('app.frontendDomain')}/password-change/${
        mailData.data.hash
      } ${await i18n.t('common.resetPassword')}`,
      template: 'reset-password',
      context: {
        title: await i18n.t('common.resetPassword'),
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.hash
        }`,
        actionTitle: await i18n.t('common.resetPassword'),
        app_name: this.configService.get('app.name'),
        text1: await i18n.t('reset-password.text1'),
        text2: await i18n.t('reset-password.text2'),
        text3: await i18n.t('reset-password.text3'),
        text4: await i18n.t('reset-password.text4'),
      },
    });
  }

  async orderConfirmation(mailData: MailData<{ order: any }>) {
    const i18n = I18nContext.current();

    await this.mailerService.sendMail({
      to: mailData.to,
      subject:
        (await i18n.t('common.orderConfirmation')) +
        ' ' +
        mailData.data.order.orderId,
      template: 'order-confirmation',
      context: {
        companyLogo: 'https://i.ibb.co/0XK0Vw6/logo.png',
        companyName: 'Image To Art',
        customerName:
          mailData.data.order.shipping.firstName +
          ' ' +
          mailData.data.order.shipping.lastName,
        orderNumber: mailData.data.order.orderId,
        date: new Date(mailData.data.order.createdAt).toLocaleDateString(),
        companyAddress: process.env.ADDRESS_LINE1,
        companyPhone: process.env.PHONE,
        supportEmail: process.env.EMAIL,
        productName: mailData.data.order.product.name,
        productDescription: mailData.data.order.product.type,
        productPrice: `$${mailData.data.order.product.price}`,
        totalPrice: `$${mailData.data.order.total}`,
        shippingMethod: mailData.data.order.shippingType,
        shippingDetails: '',
        shippingPrice: `$${
          mailData.data.order.product.price - mailData.data.order.total
        }`,
      },
    });
  }

  async orderShipped(mailData: MailData<{ order: any }>) {
    const i18n = I18nContext.current();

    await this.mailerService.sendMail({
      to: mailData.to,
      subject:
        (await i18n.t('common.orderShipped')) +
        ' ' +
        mailData.data.order.orderId,
      template: 'order-shipped',
      context: {
        companyLogo: 'https://i.ibb.co/0XK0Vw6/logo.png',
        customerName:
          mailData.data.order.shipping.firstName +
          ' ' +
          mailData.data.order.shipping.lastName,
        orderNumber: mailData.data.order.orderId,
        companyPhone: process.env.PHONE,
        supportEmail: process.env.EMAIL,
        productName: mailData.data.order.product.name,
        trackingUrl: mailData.data.order.trackingUrl,
        trackingCode: mailData.data.order.trackingCode,
        shipmentMethodName: mailData.data.order.shipmentMethodName,
        shippingAddress: `${mailData.data.order.shipping.address}, ${mailData.data.order.shipping.city}, ${mailData.data.order.shipping.state}, ${mailData.data.order.shipping.country}, ${mailData.data.order.shipping.zip}`,
      },
    });
  }

  async orderCanceled(mailData: MailData<{ order: any }>) {
    const i18n = I18nContext.current();

    await this.mailerService.sendMail({
      to: mailData.to,
      subject:
        (await i18n.t('common.orderCanceled')) +
        ' ' +
        mailData.data.order.orderId,
      template: 'order-canceled',
      context: {
        companyLogo: 'https://i.ibb.co/0XK0Vw6/logo.png',
        companyName: 'Image To Art',
        customerName:
          mailData.data.order.shipping.firstName +
          ' ' +
          mailData.data.order.shipping.lastName,
        orderNumber: mailData.data.order.orderId,
        orderDate: new Date(mailData.data.order.createdAt).toLocaleDateString(),
        companyPhone: process.env.PHONE,
        supportEmail: process.env.EMAIL,
        totalPrice: `$${mailData.data.order.total}`,
      },
    });
  }
}
