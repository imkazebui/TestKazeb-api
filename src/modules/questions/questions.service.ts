import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateQuestionDto,
  CreateQuestionsDto,
} from './dto/create-question.dto';
import {
  Question,
  QuestionDocument,
  schemaName,
} from '../../schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(schemaName)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = await this.questionModel.create(createQuestionDto);
    return createdQuestion;
  }

  async bulkCreate(data: CreateQuestionsDto): Promise<any> {
    const { questions } = data;
    const createdQuestions = await this.questionModel.insertMany(questions);
    return createdQuestions;
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ _id: id }).exec();
  }

  async updateOne(id: string, payload: CreateQuestionDto): Promise<Question> {
    return this.questionModel.findOneAndUpdate({ _id: id }, payload);
  }

  async delete(id: string) {
    const deletedValue = await this.questionModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (deletedValue._id) {
      return true;
    }
    return false;
  }
}
