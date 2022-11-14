import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { TestsModule } from './modules/tests/tests.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // DATABASE
        // DATABASE_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    QuestionsModule,
    TestsModule,
    AssessmentsModule,
    QuizModule,
  ],
})
export class AppModule {}
