import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule],
  providers: [LikesService],
  controllers: [LikesController]
})
export class LikesModule {}
