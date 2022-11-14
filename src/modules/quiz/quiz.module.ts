import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizSchemaName, QuizSchema } from '../../schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuizSchemaName, schema: QuizSchema }]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
