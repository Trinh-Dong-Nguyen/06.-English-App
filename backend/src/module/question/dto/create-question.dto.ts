import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/module/answer/dto/create-answer.dto';
import { QUESTION_TYPE } from 'src/utils/constants';

export class CreateQuestionDto {
  @AutoMap()
  @ApiProperty({ description: 'Question group ID', nullable: true })
  @IsOptional()
  @IsString()
  questionGroup?: string | null;

  @AutoMap()
  @ApiProperty({ description: 'Section ID' })
  @IsOptional()
  @IsString({})
  section?: string;

  @AutoMap()
  @ApiProperty({
    description: 'Text of the question',
    type: String,
  })
  @IsString()
  text: string;

  @AutoMap()
  @ApiProperty({
    description: 'Type of the question',
    enum: QUESTION_TYPE,
    example: QUESTION_TYPE.BLANK,
  })
  @IsEnum(QUESTION_TYPE)
  type: QUESTION_TYPE;

  @AutoMap()
  @ApiProperty({
    description: 'Order of the question',
    type: Number,
  })
  @IsInt()
  order: number;

  @ApiProperty({
    description: 'Answers of the question',
    type: [CreateAnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[] = [];
}
