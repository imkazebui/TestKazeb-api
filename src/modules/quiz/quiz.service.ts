import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz, QuizDocument, QuizSchemaName } from '../../schemas/quiz.schema';
import {
  QuestionDocument,
  QuestionSchemaName,
} from '../../schemas/question.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QuizSchemaName)
    private readonly quizModel: Model<QuizDocument>,
    @InjectModel(QuestionSchemaName)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async create(payload: CreateQuizDto): Promise<Quiz> {
    const createdQuiz = await this.quizModel.create(payload);
    return createdQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizModel.find();
  }

  async findOne(id: string): Promise<any> {
    const quiz: any = await (
      await this.quizModel.findById(id).exec()
    ).toObject();
    const questions = await this.questionModel
      .find({
        _id: { $in: quiz.questionIds },
      })
      .exec();
    const result = {
      ...quiz,
      questions,
    };
    return result;
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
