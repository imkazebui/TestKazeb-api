import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
}
