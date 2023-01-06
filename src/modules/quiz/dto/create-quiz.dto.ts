import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionOptionDto } from '../../questions/dto/create-question.dto';

export class SampleQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options: [
    {
      id: number;
      text: string;
    },
  ];
}

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasPreview: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  sampleQuestions: [
    {
      id: number;
      text: string;
    },
  ];
}
