import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/schemas/UserSettings.schema';
import { SettingService } from './seeting.service';
import { SettingController } from './seeting.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
