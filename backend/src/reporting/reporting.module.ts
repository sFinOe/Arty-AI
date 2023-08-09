import { Module } from '@nestjs/common';
import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';
import { UsersModule } from 'src/users/users.module';
import { UseragentModule } from 'src/useragent/useragent.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [UsersModule, UseragentModule, OrdersModule],
  controllers: [ReportingController],
  providers: [ReportingService],
})
export class ReportingModule {}
