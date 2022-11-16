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
    return await this.quizModel.find();
  }

  async findOne(id: string): Promise<Quiz> {
    return await this.quizModel.findById(id).exec();
  }

  async updateOne(id: string, payload: CreateQuizDto): Promise<Quiz> {
    return this.quizModel.findOneAndUpdate({ _id: id }, payload, { new: true });
  }

  async delete(id: string) {
    const deletedValue = await this.quizModel.findByIdAndRemove({ _id: id });
    if (deletedValue._id) {
      return true;
    }
    return false;
  }
}
