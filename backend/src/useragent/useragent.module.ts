import { Module } from '@nestjs/common';
import { UseragentController } from './useragent.controller';
import { UseragentService } from './useragent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAgent } from './entities/useragent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAgent])],
  controllers: [UseragentController],
  providers: [UseragentService],
  exports: [UseragentService],
})
export class UseragentModule {}
