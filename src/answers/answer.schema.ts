import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

import { Transform } from 'class-transformer';

export type AnswerDocument = Answer & Document;
@Schema()
export class Answer {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({
    required: true,
  })
  text: string;

  @Prop()
  createdBy: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: string;

  @Prop({
    type: Date,
  })
  updatedAt: string;

  @Prop()
  updatedBy: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
