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
import { PricesService } from './prices.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Products')
@Controller({
  path: 'product',
  version: '1',
})
export class PricesController {
  constructor(public service: PricesService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('savePrices')
  public async savePrices(@Request() request, @Body() body) {
    return this.service.savePrices(request.user, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AuthGuard('guest_jwt'))
  @Get('GetPrices')
  public async getprices(@Request() request, @Body() body) {
    return this.service.getprices(request.user, body);
  }
}
