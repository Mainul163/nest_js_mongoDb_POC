import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateSettingDto } from './dtos/createSettingDto.dto';
import { SettingService } from './seeting.service';

@Controller('settings')
export class SettingController {
  constructor(private postsService: SettingService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() createSettings: CreateSettingDto) {
    return this.postsService.createPost(createSettings);
  }
}
