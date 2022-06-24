import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { schemaName, QuestionSchema } from '../schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: schemaName, schema: QuestionSchema }]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
