import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Order Details')
@Controller({
  path: 'user',
  version: '1',
})
export class OrdersController {
  constructor(public service: OrdersService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me', 'admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('available-orders')
  public async available_orders(@Request() request) {
    return this.service.available_orders(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AuthGuard('guest_jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('confirmed-order')
  public async confirmed_order(@Request() request, @Body() body) {
    return this.service.confirmed_order(request.user, body);
  }
}
