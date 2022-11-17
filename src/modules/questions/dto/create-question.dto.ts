import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { QuestionTypeEnum } from '../../../utils/constant';

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

  @ValidateIf((object) => {
    return object.type === QuestionTypeEnum.MULTIPLE_CHOICE;
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options: [
    {
      id: number;
      text: string;
    },
  ];

  @ValidateIf(
    (object) =>
      object.type === QuestionTypeEnum.MULTIPLE_CHOICE &&
      object.options.length !== object.answers.length,
  )
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => String)
  answers: number[];
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

  @ArrayNotEmpty()
  preview_questions: CreateQuestionDto[];

  duration: number;
}
