import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Req,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CheckoutService } from './checkout.service';

@ApiTags('Checkout')
@Controller({
  path: 'payment',
  version: '1',
})
export class CheckoutController {
  constructor(public service: CheckoutService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'), AuthGuard('guest_jwt'))
  @Post('create-checkout')
  public async create_checkout(@Request() request, @Body() body) {
    return this.service.create_checkout(request.user, body);
  }

  @Post('webhook')
  public async webhook(@Req() req, @Body() body) {
    return this.service.webhook(req, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'), AuthGuard('guest_jwt'))
  @Post('paypal-checkout')
  public async paypal_checkout(@Request() request, @Body() body) {
    return this.service.paypal_checkout(request.user, body);
  }

  @Post('product-webhook')
  public async product_webhook(@Headers() headers, @Req() req, @Body() body) {
    const apiKey = headers['x-ct-api-key'];

    if (apiKey !== process.env.CT_API_KEY) {
      return HttpStatus.UNAUTHORIZED;
    }

    return this.service.product_webhook(req, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('cancel-order')
  public async cancel_order(@Request() request, @Body() body) {
    return this.service.cancel_order(body);
  }
}
