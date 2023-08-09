import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';
import { GuestAuthModule } from 'src/guest-auth/guest-auth.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UsersModule, OrdersModule, GuestAuthModule, MailModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
