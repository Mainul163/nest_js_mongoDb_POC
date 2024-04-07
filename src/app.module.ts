import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { SettingModule } from './seeting/setting.module';
import { OtpModule } from './otp/otp.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    PostsModule,
    SettingModule,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
