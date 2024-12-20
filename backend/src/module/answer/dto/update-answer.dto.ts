import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @AutoMap()
  @ApiProperty({ description: 'Answer ID' })
  @IsString()
  id: string;

  @AutoMap()
  @ApiProperty({ description: 'Answer text' })
  @IsString()
  @IsOptional()
  text: string;

  @AutoMap()
  @ApiProperty({ description: 'Is correct answer' })
  @IsOptional()
  isCorrect: boolean;
}
