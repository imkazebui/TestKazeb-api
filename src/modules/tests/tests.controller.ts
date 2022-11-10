import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from '../../schemas/test.schema';

@ApiTags('Tests')
@Controller('tests')
export class TestsController {
  constructor(private readonly TestsSV: TestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create test' })
  async create(@Body() createTestDto: CreateTestDto) {
    await this.TestsSV.create(createTestDto);
  }

  @Post('/bulkCreate')
  @ApiOperation({ summary: 'Create test' })
  async bulkCreate() {
    await this.TestsSV.bulkCreate();
  }

  @Get()
  @ApiOperation({ summary: 'Get list tests' })
  async findAll(): Promise<Test[]> {
    return this.TestsSV.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a test' })
  async findOne(@Param('id') id: string): Promise<Test> {
    return this.TestsSV.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a test' })
  async delete(@Param('id') id: string) {
    return this.TestsSV.delete(id);
  }
}
