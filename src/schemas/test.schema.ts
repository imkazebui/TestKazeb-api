import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ResultEnum, StatusEnum } from '../constants/enum';

export type TestDocument = Test & Document;

@Schema()
export class Test {
  @Prop({
    required: true,
  })
  assesmentId: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop()
  choices: {
    questionId: string;
    selection: string[];
  }[];

  @Prop()
  totalScore: number;

  @Prop({
    required: true,
    enum: StatusEnum,
  })
  status: string;

  @Prop({
    enum: ResultEnum,
  })
  result: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: string;

  @Prop({
    type: Date,
  })
  updatedAt: string;

  @Prop({
    type: Date,
  })
  expiredAt: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
export const schemaName = 'Test';
