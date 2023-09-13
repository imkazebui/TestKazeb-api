import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import {
  QuestionTypeEnum,
  SkillEnum,
  QuestionLevelEnum,
} from '../constants/enum';
import { Transform, Type } from 'class-transformer';
import { Answer } from '../answers/answer.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({
    required: true,
  })
  text: string;

  @Prop({
    required: true,
    enum: SkillEnum,
  })
  skill: string;

  @Prop({
    required: true,
    enum: QuestionTypeEnum,
  })
  type: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Answer.name })
  @Type(() => Answer)
  answers: Answer[];

  @Prop({ enum: QuestionLevelEnum })
  level: string;

  @Prop()
  correctAnswer: number;

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

const QuestionSchema = SchemaFactory.createForClass(Question);

export { QuestionSchema };
