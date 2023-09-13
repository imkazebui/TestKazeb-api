import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionTypeEnum } from '../../constants/enum';

export class QuestionOptionDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateQuestionDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsOptional()
  quizId: string;

  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsEnum(QuestionTypeEnum)
  @IsNotEmpty()
  type: string;
}

export class CreateQuestionsDto {
  @ArrayNotEmpty()
  questions: any[];

  @IsString()
  @IsNotEmpty()
  test_name: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsBoolean()
  has_preview: boolean;

  @ArrayNotEmpty()
  preview_questions: CreateQuestionDto[];

  duration: number;
}
