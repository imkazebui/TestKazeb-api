import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // DATABASE
        DATABASE_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    QuestionsModule,
    TestsModule,
  ],
})
export class AppModule {}
