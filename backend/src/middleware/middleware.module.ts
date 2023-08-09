import { Module } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';
import { UseragentModule } from '../useragent/useragent.module';

@Module({
  imports: [UseragentModule],
  providers: [MiddlewareService],
  exports: [MiddlewareService],
})
export class MiddlewareModule {}
