import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  type: 'CODING' | 'MULTIPLE_CHOICE';

  @Prop()
  category: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const schemaName = 'Question';