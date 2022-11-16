/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from '../../schemas/quiz.schema';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly QuizSV: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create quiz' })
  async create(@Body() createQuestionDto: CreateQuizDto) {
    return this.QuizSV.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list quizzes' })
  async findAll(): Promise<Quiz[]> {
    return this.QuizSV.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question' })
  async findOne(@Param('id') id: string): Promise<Quiz> {
    return this.QuizSV.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question' })
  async updateOne(@Param('id') id: string, @Body() payload: CreateQuizDto) {
    return this.QuizSV.updateOne(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  async delete(@Param('id') id: string) {
    return this.QuizSV.delete(id);
  }
}
