import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from '../schemas/question.schema';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly QuestionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create question' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    await this.QuestionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list questions' })
  async findAll(): Promise<Question[]> {
    return this.QuestionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question' })
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.QuestionsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  async delete(@Param('id') id: string) {
    return this.QuestionsService.delete(id);
  }
}
