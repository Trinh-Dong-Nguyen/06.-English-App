import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionGroupDto } from './create-question-group.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionGroupDto {
  @AutoMap()
  @ApiProperty({
    description: 'Question group ID',
    type: String,
    required: true,
  })
  @IsString()
  id: string;

  @AutoMap()
  @IsOptional()
  @ApiProperty({
    description: 'Question group name',
    type: String,
    required: false,
  })
  @IsString()
  text?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Section ID', type: String, required: false })
  section?: string;
}
