import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz, QuizDocument, QuizSchemaName } from '../../schemas/quiz.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QuizSchemaName)
    private readonly quizModel: Model<QuizDocument>,
  ) {}

  async create(createQuestionDto: CreateQuizDto): Promise<Quiz> {
    const createdQuestion = await this.quizModel.create(createQuestionDto);
    return createdQuestion;
  }

  async findAll(): Promise<Quiz[]> {
    return [];
  }

  async findOne(): Promise<Quiz> {
    return null;
  }

  async updateOne(): Promise<Quiz> {
    return null;
  }

  async delete(id: string) {
    const deletedValue = await this.quizModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (deletedValue._id) {
      return true;
    }
    return false;
  }
}
