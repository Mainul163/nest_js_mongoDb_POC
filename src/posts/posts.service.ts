import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User Not Found', 404);
    const newPost = new this.postModel({ ...createPostDto, user: userId });
    const savedPost = await newPost.save();
    await findUser.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });
    return savedPost;
  }

  findPostById() {}
}

// async createPost({ userId, ...createPostDto }: CreatePostDto) {
//   const findUser = await Promise.all(
//     userId.map(async (userId) => {
//       return await this.userModel.findById(userId);
//     }),
//   );

//   // Check if any user was not found
//   if (findUser.some(user => !user)) {
//     throw new HttpException('User Not Found', 404);
//   }

//   const newPost = new this.postModel({ ...createPostDto, user: userId });
//   const savedPost = await newPost.save();

//   // Update each found user
//   await Promise.all(
//     findUser.map(async (user) => {
//       await user.updateOne({
//         $push: {
//           posts: savedPost._id,
//         },
//       });
//     })
//   );

//   return savedPost;
// }