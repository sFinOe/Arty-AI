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
import { ReportingService } from './reporting.service';

@ApiTags('reporting')
@Controller({
  path: 'report',
  version: '1',
})
export class ReportingController {
  constructor(public service: ReportingService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('budget')
  public async get_report(@Request() request, @Body() body) {
    return this.service.get_budget(request.user, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('traffic')
  public async get_traffic(@Request() request, @Body() body) {
    return this.service.get_traffic(request.user, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('orders')
  public async get_orders(@Request() request, @Body() body) {
    return this.service.get_orders(request.user, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('customers')
  public async get_customers(@Request() request, @Body() body) {
    return this.service.get_customers(request.user, body);
  }
}
