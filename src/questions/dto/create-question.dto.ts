import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  type: 'CODING' | 'MULTIPLE_CHOICE';

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  input: string;

  @IsArray()
  @IsOptional()
  options: [];

  @IsNumber()
  @IsOptional()
  answer: number;
}
