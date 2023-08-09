import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Billing } from './entities/billing.entity';
import { Product } from './entities/product.entity';
import { Shipping } from './entities/shipping.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BillingService } from './billing.service';
import { ProductService } from './product.service';
import { ShippingService } from './shipping.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Billing]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Shipping]),
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, BillingService, ProductService, ShippingService],
  exports: [OrdersService, BillingService, ProductService, ShippingService],
})
export class OrdersModule {}
