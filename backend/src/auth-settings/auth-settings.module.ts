import { Module } from '@nestjs/common';
import { AuthSettingsController } from './auth-settings.controller';
import { AuthSettingsService } from './auth-settings.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule],
  controllers: [AuthSettingsController],
  providers: [AuthSettingsService]
})
export class AuthSettingsModule {}
