import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { InviteCandidateDto } from './dto/invite-candidate.dto';
import {
  Assessment,
  AssessmentDocument,
  AssesmentSchemaName,
} from '../../schemas/assessment.schema';
import { QuizDocument, QuizSchemaName } from '../../schemas/quiz.schema';
import { AssessmentStatusEnum } from '../../utils/constant';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectModel(AssesmentSchemaName)
    private readonly assessmentModel: Model<AssessmentDocument>,
    @InjectModel(QuizSchemaName)
    private readonly quizModel: Model<QuizDocument>,
  ) {}

  async create(payload: CreateAssessmentDto): Promise<Assessment> {
    try {
      if (payload.quizIds?.length > 0) {
        const quizzes = await this.quizModel.find({
          _id: {
            $in: payload.quizIds,
          },
        });
        if (quizzes.length != payload.quizIds?.length) {
          throw new Error('Error');
        }
      }

      const data = { ...payload, status: AssessmentStatusEnum.ACTIVE };
      const createdAssessment = await this.assessmentModel.create(data);
      return createdAssessment;
    } catch (error) {
      return error;
    }
  }

  async inviteCandidate(
    inviteCandidateDto: InviteCandidateDto,
  ): Promise<boolean> {
    if (inviteCandidateDto) return true;
  }

  async findAll(): Promise<Assessment[]> {
    return this.assessmentModel.find().exec();
  }

  async findOne(id: string): Promise<Assessment> {
    return this.assessmentModel.findOne({ _id: id }).exec();
  }

  async updateOne(
    id: string,
    payload: CreateAssessmentDto,
  ): Promise<Assessment> {
    if (payload.quizIds?.length > 0) {
      const quizzes = await this.quizModel.find({
        _id: {
          $in: payload.quizIds,
        },
      });
      if (quizzes.length != payload.quizIds?.length) {
        throw new Error('Error');
      }
    }
    return this.assessmentModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async delete(id: string) {
    const deletedValue = await this.assessmentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (deletedValue?._id) {
      return true;
    }
    return false;
  }
}
