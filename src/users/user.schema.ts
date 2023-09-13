import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { UserTypeEnum } from '../constants/enum';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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

  fullName: string;

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

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

export { UserSchema };
