import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from './question.schema';

export type AssessmentDocument = Assessment & Document;
@Schema()
export class Assessment {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

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

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);
export const schemaName = 'Assessment';
