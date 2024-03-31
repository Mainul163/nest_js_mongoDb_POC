import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreateSettingDto } from './dtos/createSettingDto.dto';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(UserSettings.name)
    private userSettingModel: Model<UserSettings>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createUserSettingsDto }: CreateSettingDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User Not Found', 404);

    // Assuming your UserSettings schema is properly set up to reference User schema,
    // create a new user setting object with the user ID.
    const newUserSettings = new this.userSettingModel({
      ...createUserSettingsDto,
      user: userId,
    });

    // Save the new user settings.
    const savedUserSettings = await newUserSettings.save();

    // Populate the 'user' field in the savedUserSettings object with user information.
    const populatedUserSettings = await savedUserSettings.populate({
      path: 'user',
      select: 'username',
    });
    await findUser.updateOne({
      $push: {
        settings: savedUserSettings._id,
      },
    });
    const populatedUser = await this.userModel
      .findById(userId)
      .populate({ path: 'posts', select: 'title' });

    // Return the populated user settings.
    const test = {
      user: populatedUser.username,

      posts: populatedUser.posts,
    };
    return {
      title: populatedUserSettings.title,
      user: test,
    };
  }

  findPostById() {}
}
