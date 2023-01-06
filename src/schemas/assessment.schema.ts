import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AssessmentStatusEnum } from '../constants/enum';

export type AssessmentDocument = Assessment & Document;
@Schema()
export class Assessment {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  description: string;

  @Prop()
  jobRole: string;

  @Prop()
  duration: number;

  @Prop({
    required: true,
    enum: AssessmentStatusEnum,
  })
  status: string;

  @Prop()
  quizIds: string[];

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
export const AssesmentSchemaName = 'Assessment';
