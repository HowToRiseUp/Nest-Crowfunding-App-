import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  address: String,
});

@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  address: string;
  @Prop()
  CreateAt: Date;
  @Prop()
  UpdateAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(User);
