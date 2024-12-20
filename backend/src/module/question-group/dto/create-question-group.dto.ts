import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { QUESTION_GROUP_TYPE } from 'src/utils/constants';

export class CreateQuestionGroupDto {
  @AutoMap()
  @ApiProperty({
    enum: QUESTION_GROUP_TYPE,
    description: 'Question group type',
    example: QUESTION_GROUP_TYPE.MULTIPLE_CHOICE,
  })
  @IsEnum(QUESTION_GROUP_TYPE)
  questionGroupType: QUESTION_GROUP_TYPE;
  @AutoMap()
  @ApiProperty({ description: 'Question group name' })
  @IsString()
  text: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ description: 'Section ID' })
  section: string;
}
