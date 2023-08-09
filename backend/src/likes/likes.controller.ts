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
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Details')
@Controller({
  path: 'user',
  version: '1',
})
export class LikesController {
  constructor(public service: LikesService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('add-like')
  public async like(@Request() request, @Body() body) {
    return this.service.add_like(request.user, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('likes')
  public async likes(@Request() request, @Body() body) {
    return this.service.likes(request.user, body);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteUser')
  public async DeleteUser(@Request() request, @Body() body) {
    return this.service.DeleteUser(request.user, body);
  }
}
