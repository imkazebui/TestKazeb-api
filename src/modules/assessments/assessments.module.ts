import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from './assessments.service';
import {
  AssesmentSchemaName,
  AssessmentSchema,
} from '../../schemas/assessment.schema';

import { QuizSchemaName, QuizSchema } from '../../schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssesmentSchemaName, schema: AssessmentSchema },
      { name: QuizSchemaName, schema: QuizSchema },
    ]),
  ],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
})
export class AssessmentsModule {}
