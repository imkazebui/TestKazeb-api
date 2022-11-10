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
  type: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  level: string;

  @IsArray()
  @IsOptional()
  options: [
    {
      id: number;
      text: string;
    },
  ];

  @IsNumber()
  @IsOptional()
  answer: number;
}
