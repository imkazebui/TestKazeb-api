import { Controller, Get, Delete } from '@nestjs/common';
import { Answer } from './answer.schema';
import { AnswersService } from './answers.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersSV: AnswersService) {}

  @Get()
  @ApiOperation({ summary: 'Get list answers' })
  async findAll(): Promise<Answer[]> {
    return this.answersSV.findAll();
  }

  @Delete('/delete-all')
  @ApiOperation({ summary: 'Delete all questions' })
  async deleteAll() {
    return this.answersSV.deleteAll();
  }
}
