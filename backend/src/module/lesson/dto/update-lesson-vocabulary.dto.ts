import { AutoMap } from '@automapper/classes';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonVocabularyDto } from './create-lesson-vocabulary.dto';
import { IsString } from 'class-validator';

export class UpdateLessonVocabularyDto extends PartialType(
  CreateLessonVocabularyDto,
) {
  @AutoMap()
  @IsString()
  id: string;
}
