import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateLessonVocabularyDto } from './create-lesson-vocabulary.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { WORD_TYPE } from 'src/utils/constants';

export class AddVocabularyToLessonDto {
  @IsArray()
  @ValidateNested({ each: true })
  @AutoMap()
  @Type(() => CreateLessonVocabularyDto)
  @ApiProperty({
    type: [CreateLessonVocabularyDto],
    description: 'List of vocabularies',
    example: [
      {
        vocabulary: 'Hello',
        note: 'This is a note',
        mediaWord: 'key of aws',
        wordType: WORD_TYPE.NOUN,
      },
      {
        vocabulary: 'Goodbye',
        note: 'This is a note',
        mediaWord: 'key of aws',
        wordType: WORD_TYPE.NOUN,
      },
    ],
  })
  vocabularies: CreateLessonVocabularyDto[];
}
