import { Controller, Post, Body } from '@nestjs/common';
import * as axios from 'axios';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}
  @Post()
  async initiateTransaction(@Body() createOtpDto: CreateOtpDto) {
    console.log('hlw');
    return this.otpService.sendOTP(createOtpDto);
  }
}
