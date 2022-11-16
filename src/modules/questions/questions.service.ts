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
  QuestionSchemaName,
} from '../../schemas/question.schema';
import { QuizDocument, QuizSchemaName } from '../../schemas/quiz.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(QuestionSchemaName)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(QuizSchemaName)
    private readonly quizModel: Model<QuizDocument>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = await this.questionModel.create(createQuestionDto);
    return createdQuestion;
  }

  async bulkCreate(data: CreateQuestionsDto): Promise<any> {
    const {
      questions,
      test_name,
      level,
      has_preview,
      preview_questions,
      duration,
    } = data;
    let quiz = await this.quizModel.findOne({ name: test_name, level }).exec();
    if (!quiz) {
      quiz = await this.quizModel.create({
        name: test_name,
        level,
        duration: +duration,
        hasPreview: has_preview,
        sampleQuestions: preview_questions.map((item: any) => ({
          question: item.text,
          options: item.answers,
          type: item.type.replace(/-/g, '_').toUpperCase(),
          answers: preview_questions
            .filter((item: any) => item.score > 0)
            .map((object: any) => object.id),
        })),
      });
    }
    const importQuestion = questions.map((item: any) => ({
      question: item.question.text,
      quizId: quiz._id,
      type: item.question.type.replace(/-/g, '_').toUpperCase(),
      options: item.question.answers,
      answers: item.answers,
    }));
    const createdQuestions = await this.questionModel.insertMany(
      importQuestion,
    );
    return createdQuestions;
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ _id: id }).exec();
  }

  async updateOne(id: string, payload: CreateQuestionDto): Promise<Question> {
    return this.questionModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
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
