import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Question, QuestionDocument } from './question.schema';
import reactQuestions from '../data/testgorilla/react/test.json';
import nodeQuestions from '../data/testgorilla/nodejs/test.json';
import html5Questions from '../data/testgorilla/html5/test.json';
import expressjsQuestions from '../data/testgorilla/expressjs/test.json';
import cssQuestions from '../data/testgorilla/css/test.json';
import cleanCodeQuestions from '../data/testgorilla/clean_code/test.json';
import { AnswersService } from 'src/answers/answers.service';
import {
  QuestionLevelEnum,
  QuestionTypeEnum,
  SkillEnum,
} from 'src/constants/enum';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    private readonly answersSV: AnswersService,
  ) {}

  async create(): Promise<Question> {
    const createdQuestion = await this.questionModel.create({});
    return createdQuestion;
  }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    search?: string,
  ) {
    const filters: FilterQuery<QuestionDocument> = {};

    if (search) {
      filters.$text = {
        $search: search,
      };
    }

    const query = this.questionModel
      .find(filters)
      .skip(documentsToSkip)
      .populate('listAnswers');

    if (limitOfDocuments) {
      query.limit(limitOfDocuments);
    }

    const results = await query.exec();
    const count = await this.questionModel.count();

    return { results, count };
  }

  async findOne(id: string): Promise<Question> {
    return await this.questionModel
      .findOne({ _id: id })
      .populate('listAnswers')
      .exec();
  }

  async updateOne(id: string, payload: UpdateQuestionDto): Promise<Question> {
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

  async deleteAll() {
    const deletedValue = await this.questionModel.deleteMany();

    return deletedValue;
  }

  async createFromFile(name: string) {
    const questionSkillMapping = {
      [SkillEnum.react]: reactQuestions,
      [SkillEnum.nodejs]: nodeQuestions,
      [SkillEnum.html5]: html5Questions,
      [SkillEnum.expressjs]: expressjsQuestions,
      [SkillEnum.css]: cssQuestions,
      [SkillEnum.clean_code]: cleanCodeQuestions,
    };

    let questions = questionSkillMapping[name];

    if (!questions) {
      return 'ERR';
    }

    questions = questions.questions;

    const mapQuestionType = (type) => {
      const questionTypeMapping = {
        shorttext: QuestionTypeEnum.short_text,
        truefalse: QuestionTypeEnum.true_false,
      };

      return questionTypeMapping[type] || QuestionTypeEnum.multiple_choice;
    };

    const questionsData = [];
    await Promise.all(
      questions.map(async (q) => {
        const question = {
          text: q.question.text,
          skill: name,
          type: mapQuestionType(q.question.type),
          listAnswers: [],
          level: QuestionLevelEnum.junior,
          answerText: null,
          answers: [],
        };

        if (question.type == QuestionTypeEnum.multiple_choice) {
          const res = await this.answersSV.insertMany(
            q.question.answers.map(({ text }) => ({ text })),
          );
          question.listAnswers = res.map((r) => r._id);
        }

        questionsData.push(question);
      }),
    );

    const result = await this.questionModel.insertMany(questionsData);

    return result;
  }
}
