import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from './answer.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
  ) {}

  async insertMany(data) {
    const res = await this.answerModel.insertMany(data);
    return res;
  }

  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  async deleteAll() {
    const deletedValue = await this.answerModel.deleteMany();

    return deletedValue;
  }
}
