import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @AutoMap()
  @ApiProperty({
    description: 'Id of the course',
    type: String,
    example: '9af8862c-6690-4aa1-9c5a-d7a4a57d8b69',
  })
  @IsString()
  id: string;
}
