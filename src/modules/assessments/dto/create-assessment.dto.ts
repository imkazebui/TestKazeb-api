import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateAssessmentDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  jobRole: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  quizIds: string[] = [];
}
