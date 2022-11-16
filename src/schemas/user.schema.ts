import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserTypeEnum } from '../utils/constant';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
    enum: UserTypeEnum,
  })
  type: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: string;

  @Prop({
    type: Date,
  })
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const schemaName = 'User';
