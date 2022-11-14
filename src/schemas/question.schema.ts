import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QuestionTypeEnum } from '../utils/constant';

export type QuestionDocument = Question & Document;
@Schema()
export class Question {
  @Prop({
    required: true,
  })
  question: string;

  @Prop()
  quizId: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    enum: QuestionTypeEnum,
  })
  type: string;

  @Prop()
  options: {
    id: number;
    text: string;
  }[];

  @Prop()
  answer: number[];

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

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const schemaName = 'Question';
