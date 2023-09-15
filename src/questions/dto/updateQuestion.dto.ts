import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { Answer } from '../../answers/answer.schema';

export class UpdateQuestionDto {
  @IsOptional()
  @Exclude()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  answerText?: string;

  @Type(() => Answer)
  @IsOptional()
  answers?: Answer[];
}
