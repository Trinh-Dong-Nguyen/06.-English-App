import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsString()
  @AutoMap()
  id: string;
}
