import { IsPhoneNumber } from 'class-validator';

export class CreateOtpDto {
  @IsPhoneNumber('BD', { message: 'Invalid phone number' })
  phoneNumber: string;
}
