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
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { InviteCandidateDto } from './dto/invite-candidate.dto';
import { Assessment } from '../../schemas/assessment.schema';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly AssessmentsSV: AssessmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create assessment' })
  async create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.AssessmentsSV.create(createAssessmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list assessments' })
  async findAll(): Promise<Assessment[]> {
    return this.AssessmentsSV.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a assessment' })
  async findOne(@Param('id') id: string): Promise<Assessment> {
    return this.AssessmentsSV.findOne(id);
  }

  @Get(':id/detail')
  @ApiOperation({ summary: 'Get a assessment' })
  async getDetail(@Param('id') id: string): Promise<Assessment> {
    return this.AssessmentsSV.getDetail(id);
  }

  @Post(':id/invite-candidate')
  @ApiOperation({ summary: 'Invite candidate' })
  async inviteCandidate(@Body() inviteCandidateDto: InviteCandidateDto) {
    return await this.AssessmentsSV.inviteCandidate(inviteCandidateDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a assessment' })
  async updateOne(
    @Param('id') id: string,
    @Body() payload: CreateAssessmentDto,
  ) {
    return this.AssessmentsSV.updateOne(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a assessment' })
  async delete(@Param('id') id: string) {
    return this.AssessmentsSV.delete(id);
  }
}
