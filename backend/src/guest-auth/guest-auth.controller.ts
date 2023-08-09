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
import { AuthGuard } from '@nestjs/passport';
import { GuestAuthService } from './guest-auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Guest Auth')
@Controller({
  path: 'guest-auth',
  version: '1',
})
export class GuestAuthController {
  constructor(public service: GuestAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body) {
    return this.service.login(body);
  }

  @UseGuards(AuthGuard('guest_jwt'))
  @Get('test')
  @HttpCode(HttpStatus.OK)
  public async test(@Request() request) {
    return { ok: 'ok' };
  }
}
