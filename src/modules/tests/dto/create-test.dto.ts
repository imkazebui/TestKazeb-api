import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateTestDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  summary: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  duration: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  level: string;

  @IsArray()
  @IsOptional()
  coveredSkills: [string];

  @IsNumber()
  @IsOptional()
  previewQuestions: [number];

  @IsNumber()
  @IsOptional()
  questions: [number];
}
