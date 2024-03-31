import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString({ each: true })
  @IsNotEmpty()
  userId: string[];
}
