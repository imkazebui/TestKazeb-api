import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { Question } from './question.schema';
import { PaginationParams } from '../utils/paginationParams';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsSV: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create question' })
  async create() {
    return await this.questionsSV.create();
  }

  @Get()
  @ApiOperation({ summary: 'Get list questions' })
  async findAll(
    @Query() { skip, limit }: PaginationParams,
    @Query('search') search: string,
  ) {
    return this.questionsSV.findAll(skip, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question' })
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionsSV.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  async updateOne(@Param('id') id: string, @Body() payload: UpdateQuestionDto) {
    return this.questionsSV.updateOne(id, payload);
  }

  @Delete('/delete-all')
  @ApiOperation({ summary: 'Delete all questions' })
  async deleteAll() {
    return this.questionsSV.deleteAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  async delete(@Param('id') id: string) {
    return this.questionsSV.delete(id);
  }

  @Post('/from-file/:name')
  @ApiOperation({ summary: 'Create question from file json' })
  async createFromFile(@Param('name') name: string) {
    return await this.questionsSV.createFromFile(name);
  }
}
