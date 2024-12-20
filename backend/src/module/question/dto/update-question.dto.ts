import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateAnswerDto } from 'src/module/answer/dto/update-answer.dto';
import { QUESTION_TYPE } from 'src/utils/constants';

export class UpdateQuestionDto {
  @AutoMap()
  @ApiProperty({ description: 'Question ID' })
  @IsString()
  id: string;

  @AutoMap()
  @ApiProperty({
    description: 'Text of the question',
    type: String,
  })
  @IsString()
  @IsOptional()
  text?: string;

  @AutoMap()
  @ApiProperty({
    description: 'Type of the question',
    enum: QUESTION_TYPE,
  })
  @IsOptional()
  @IsEnum(QUESTION_TYPE)
  type?: QUESTION_TYPE;

  @AutoMap()
  @ApiProperty({
    description: 'Order of the question',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  order: number;

  @ApiProperty({
    description: 'Answers of the question',
    type: [UpdateAnswerDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto)
  answers: UpdateAnswerDto[];
}
