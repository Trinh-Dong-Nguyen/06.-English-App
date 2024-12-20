import { AutoMap } from '@automapper/classes';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SECTION_TYPE } from 'src/utils/constants';
import { UpdateQuestionDto } from 'src/module/question/dto/update-question.dto';
import { UpdateQuestionGroupDto } from 'src/module/question-group/dto/update-question-group.dto';

export class UpdateSectionDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the section',
    type: String,
  })
  id: string;
  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Lession Id of the section',
    type: String,
  })
  lessionId?: string;
  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Title of the section',
    type: String,
  })
  title?: string;
  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Content of the section',
    type: String,
  })
  content?: string;
  @IsEnum(SECTION_TYPE)
  @IsOptional()
  @AutoMap()
  @ApiProperty({
    description: 'Type of the section',
    enum: SECTION_TYPE,
  })
  type?: SECTION_TYPE;
  @IsString()
  @IsOptional()
  @AutoMap()
  @ApiProperty({
    description: 'Media of the section',
    type: String,
  })
  sectionMedia?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @AutoMap()
  @ApiProperty({
    description: 'Questions of the section',
    type: [UpdateQuestionDto],
  })
  sectionQuestion?: UpdateQuestionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @AutoMap()
  @ApiProperty({
    description: 'question group of the section',
    type: [UpdateQuestionGroupDto],
  })
  sectionQuestionGroup?: UpdateQuestionGroupDto[];
}
