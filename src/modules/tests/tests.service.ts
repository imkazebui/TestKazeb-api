import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create-test.dto';
import { Test, TestDocument, schemaName } from '../../schemas/test.schema';
import newEmail from '../../utilities/nodemailer';

import mockData from '../../data/nodejs/preview.json';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(schemaName)
    private readonly testModel: Model<TestDocument>,
  ) {}
  async create(createTestDto: CreateTestDto): Promise<Test> {
    const createdTest = await this.testModel.create(createTestDto);
    return createdTest;
  }
  async bulkCreate(): Promise<any> {
    const insertedData = {
      name: mockData.name,
      summary: mockData.summary,
      duration: mockData.duration,
      type: 'PROGRAMMING_SKILLS',
      description: mockData.description,
      level: 'ADVANCED',
      coveredSkills: mockData.covered_skills.map((s) => s.description),
      previewQuestions: [],
      questions: [
        '62bda8b39398d234aa1f0459',
        '62bda8b39398d234aa1f0457',
        '62bda8b39398d234aa1f045a',
        '62bda8b39398d234aa1f0460',
        '62bda8b39398d234aa1f0458',
        '62bda8b39398d234aa1f0461',
        '62bda8b39398d234aa1f045c',
        '62bda8b39398d234aa1f045e',
        '62bda8b39398d234aa1f045b',
        '62bda8b39398d234aa1f045d',
        '62bda8b39398d234aa1f045f',
        '62bda8b39398d234aa1f0462',
        '62cc26bb1c11b055817ec921',
        '62cc26bb1c11b055817ec922',
        '62cc26bb1c11b055817ec923',
        '62cc26bb1c11b055817ec924',
        '62cc26bb1c11b055817ec925',
        '62cc26bb1c11b055817ec926',
        '62cc26bb1c11b055817ec927',
        '62cc26bb1c11b055817ec928',
        '62cc26bb1c11b055817ec929',
        '62cc26bb1c11b055817ec92a',
        '62cc26bb1c11b055817ec92b',
        '62cc26bb1c11b055817ec92c',
        '62cc26bb1c11b055817ec92d',
        '62cc26bb1c11b055817ec92e',
        '62cc26bb1c11b055817ec92f',
      ],
    };
    const createdTest = await this.testModel.insertMany(insertedData);
    return createdTest;
  }
  async findAll(): Promise<Test[]> {
    newEmail.sendMail({
      from: 'groupnhatnguyet@gmail.com', // sender address
      to: 'thiettao@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    return this.testModel.find().exec();
  }
  async findOne(id: string): Promise<Test> {
    return this.testModel.findOne({ _id: id }).exec();
  }
  async delete(id: string) {
    const deleted = await this.testModel.findByIdAndRemove({ _id: id }).exec();
    return deleted;
  }
}
