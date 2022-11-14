import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { schemaName, TestSchema } from '../../schemas/test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: schemaName, schema: TestSchema }]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
