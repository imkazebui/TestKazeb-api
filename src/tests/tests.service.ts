import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create-test.dto';
import { Test, TestDocument, schemaName } from '../schemas/test.schema';

import mockData from '../data/testgorilla/react/preview.json';

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
      level: 'INTERMEDIATE',
      coveredSkills: mockData.covered_skills.map((s) => s.description),
      previewQuestions: [],
      questions: [],
    };
    const createdTest = await this.testModel.insertMany(insertedData);
    return createdTest;
  }
  async findAll(): Promise<Test[]> {
    return this.testModel.find().exec();
  }
  async findOne(id: string): Promise<Test> {
    return this.testModel.findOne({ _id: id }).exec();
  }
  async delete(id: string) {
    const deletedCat = await this.testModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
