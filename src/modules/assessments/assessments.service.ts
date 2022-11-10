import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { InviteCandidateDto } from './dto/invite-candidate.dto';
import {
  Assessment,
  AssessmentDocument,
  schemaName,
} from '../../schemas/assessment.schema';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectModel(schemaName)
    private readonly assessmentModel: Model<AssessmentDocument>,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    const createdAssessment = await this.assessmentModel.create(
      createAssessmentDto,
    );
    return createdAssessment;
  }

  async inviteCandidate(
    inviteCandidateDto: InviteCandidateDto,
  ): Promise<boolean> {
    if (inviteCandidateDto) return true;
  }

  async findAll(): Promise<Assessment[]> {
    const data = await this.assessmentModel.find().exec();
    console.log({ assessmentIds: data.map((d) => d._id.toString()) });

    return this.assessmentModel.find({ category: 'NODEJS' }).exec();
  }

  async findOne(id: string): Promise<Assessment> {
    return this.assessmentModel.findOne({ _id: id }).exec();
  }

  async updateOne(
    id: string,
    payload: CreateAssessmentDto,
  ): Promise<Assessment> {
    return this.assessmentModel.findOneAndUpdate({ _id: id }, payload);
  }

  async delete(id: string) {
    const deleted = await this.assessmentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deleted;
  }
}
