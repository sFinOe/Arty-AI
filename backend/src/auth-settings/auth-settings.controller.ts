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
import { AuthSettingsService } from './auth-settings.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller({
	  path: 'user',
	  version: '1',
})
export class AuthSettingsController {
	  constructor(public service: AuthSettingsService) {}

	  @ApiBearerAuth()
	  @SerializeOptions({
		groups: ['me'],
	  })
	  @Get('settings')
	  @UseGuards(AuthGuard('jwt'))
	  @HttpCode(HttpStatus.OK)
	  public async settings(@Request() request) {
		return this.service.getsettings(request.user);
	  }

	  @ApiBearerAuth()
	  @SerializeOptions({
		groups: ['me'],
	  })
	  @Post('changePassword')
	  @UseGuards(AuthGuard('jwt'))
	  @HttpCode(HttpStatus.OK)
	  public async changePassword(@Request() request, @Body() body) {
		return this.service.changePassword(request.user, body);
	  }

	  @ApiBearerAuth()
	  @SerializeOptions({
		groups: ['me'],
	  })
	  @Post('changeSettings')
	  @UseGuards(AuthGuard('jwt'))
	  @HttpCode(HttpStatus.OK)
	  public async changeSettings(@Request() request, @Body() body) {
		return this.service.changeSettings(request.user, body);
	  }
}
