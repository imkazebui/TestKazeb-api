import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Status } from 'src/constants/enum';

export type AssessmentDocument = Assessment & Document;

interface ICandidate {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Schema()
export class Assessment {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  jobRole?: string;

  @Prop()
  testIds: number[];

  @Prop()
  candidate: ICandidate[];

  @Prop()
  status: Status;

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

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);
export const schemaName = 'Assessment';
