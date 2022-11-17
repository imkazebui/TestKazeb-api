import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import {
  QuestionSchemaName,
  QuestionSchema,
} from '../../schemas/question.schema';
import { QuizSchemaName, QuizSchema } from '../../schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionSchemaName, schema: QuestionSchema },
      { name: QuizSchemaName, schema: QuizSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
