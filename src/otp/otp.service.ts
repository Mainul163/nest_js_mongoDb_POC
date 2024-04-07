import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateOtpDto } from './otp.dto';

@Injectable()
export class OtpService {
  async sendOTP(createOtpDto: CreateOtpDto) {
    console.log(createOtpDto.phoneNumber, 'phone');
    const authConfig = {
      headers: {
        Authorization: 'Token e0c2fb9a20e10bab0202942d22b2a94a83c8bc8a', // Replace YourAuthToken with the actual authentication token
      },
    };
    const data = {
      receiver: createOtpDto.phoneNumber,
      message: 'Your OTP is: 123456', // Replace with the actual OTP generated
      remove_duplicate: true,
    };
    const config = {
      method: 'post',
      url: 'https://sysadmin.muthobarta.com/api/v1/send-sms',
      data: data,
      headers: {
        Authorization: 'Token e0c2fb9a20e10bab0202942d22b2a94a83c8bc8a', // Replace YourAuthToken with the actual authentication token
      },
    };
    try {
      const response = await axios(config);
      //   const response = await axios.post(
      //     'https://sysadmin.muthobarta.com/api/v1/send-sms',
      //     {
      //       receiver: phoneNumber,
      //       message: 'Your OTP is: 123456', // Replace with the actual OTP generated
      //       remove_duplicate: true,
      //     },
      //     authConfig,
      //   );

      if (response.status === 200) {
        return { success: true };
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
    return false;
  }
}
