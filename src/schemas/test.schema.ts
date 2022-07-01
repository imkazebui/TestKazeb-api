import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

enum TestType {
  ProgramingSkills = 'PROGRAMMING_SKILLS',
}

enum TestLevel {
  Entry = 'ENTRY',
  Intermediate = 'INTERMEDIATE',
}

@Schema()
export class Test {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  summary: string;

  @Prop()
  duration: number;

  @Prop({
    enum: TestType,
  })
  type: string;

  @Prop()
  description: string;

  @Prop({
    enum: TestLevel,
  })
  level: string;

  @Prop()
  coveredSkills: [string];

  @Prop()
  previewQuestions: [number];

  @Prop()
  questions: [number];

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

export const TestSchema = SchemaFactory.createForClass(Test);
export const schemaName = 'Test';
