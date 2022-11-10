import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  Question,
  QuestionDocument,
  schemaName,
} from '../../schemas/question.schema';

import mockData from '../../data/testgorilla/nodejs/test.json';

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

  async bulkCreate(): Promise<any> {
    const { questions } = mockData;
    const insertedData = questions.map(({ question }) => ({
      question: question.text,
      type: 'MULTIPLE_CHOICE',
      category: 'NODEJS',
      level: 'ADVANCED',
      answer: 0,
      options: question.answers,
    }));
    const createdQuestion = await this.questionModel.insertMany(insertedData);
    return createdQuestion;
  }

  async findAll(): Promise<Question[]> {
    const data = await this.questionModel.find().exec();
    console.log({ questionIds: data.map((d) => d._id.toString()) });

    return this.questionModel.find({ category: 'NODEJS' }).exec();
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ _id: id }).exec();
  }

  async updateOne(id: string, payload: CreateQuestionDto): Promise<Question> {
    return this.questionModel.findOneAndUpdate({ _id: id }, payload);
  }

  async delete(id: string) {
    const deleted = await this.questionModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deleted;
  }
}
