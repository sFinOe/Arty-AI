import { Module } from '@nestjs/common';
import { GuestAuthController } from './guest-auth.controller';
import { GuestAuthService } from './guest-auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GuestStrategy } from './strategies/guest-auth.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: '1y',
        },
        name: 'guest_jwt',
      }),
    }),
  ],
  controllers: [GuestAuthController],
  providers: [GuestAuthService, GuestStrategy],
})
export class GuestAuthModule {}
