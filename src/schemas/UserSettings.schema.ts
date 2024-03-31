import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema';

import mongoose, { Schema as MongooseSchema } from 'mongoose';
@Schema()
export class UserSettings {
  @Prop({ required: true })
  title: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
