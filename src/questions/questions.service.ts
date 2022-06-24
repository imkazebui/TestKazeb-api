import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  Question,
  QuestionDocument,
  schemaName,
} from '../schemas/question.schema';

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

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.questionModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
