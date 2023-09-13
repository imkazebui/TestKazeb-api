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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.schema';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsSV: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create question' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsSV.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list questions' })
  async findAll(): Promise<Question[]> {
    return this.questionsSV.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question' })
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionsSV.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question' })
  async updateOne(@Param('id') id: string, @Body() payload: CreateQuestionDto) {
    return this.questionsSV.updateOne(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  async delete(@Param('id') id: string) {
    return this.questionsSV.delete(id);
  }
}
