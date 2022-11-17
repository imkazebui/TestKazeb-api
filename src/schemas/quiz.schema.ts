import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from './question.schema';

export type QuizDocument = Quiz & Document;
@Schema()
export class Quiz {
  @Prop()
  category: string;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop()
  hasPreview: boolean;

  @Prop()
  sampleQuestions: Question[];

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

export const QuizSchema = SchemaFactory.createForClass(Quiz);
QuizSchema.index({ category: 1, level: 1 }, { unique: true });
export const QuizSchemaName = 'Quiz';
