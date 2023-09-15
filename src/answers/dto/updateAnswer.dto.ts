import { PartialType } from '@nestjs/swagger';
import { CreateAnswerDto } from './createAnswer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
