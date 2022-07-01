import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

enum QuestionType {
  Coding = 'CODING',
  MultipleChoice = 'MULTIPLE_CHOICE',
}

enum QuestionLevel {
  Entry = 'ENTRY',
  Intermediate = 'INTERMEDIATE',
}

enum QuestionCategory {
  React = 'REACT',
}
@Schema()
export class Question {
  @Prop({
    required: true,
  })
  question: string;

  @Prop({
    required: true,
    enum: QuestionType,
  })
  type: string;

  @Prop({
    enum: QuestionCategory,
  })
  category: string;

  @Prop({
    enum: QuestionLevel,
  })
  level: string;

  @Prop()
  answer: number;

  @Prop()
  options: [
    {
      id: number;
      text: string;
    },
  ];

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const schemaName = 'Question';
