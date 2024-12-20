import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { WORD_TYPE } from 'src/utils/constants';

export class CreateLessonVocabularyDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Lesson vocabulary',
    example: 'Hello',
  })
  @IsString()
  vocabulary: string;
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Note of vocabulary',
    example: 'This is a note',
  })
  @IsEnum(WORD_TYPE)
  @AutoMap()
  @ApiProperty({
    enum: WORD_TYPE,
    description: 'Type of word',
    example: WORD_TYPE.NOUN,
  })
  wordType: WORD_TYPE;
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Media word',
    example: 'media-word',
  })
  @IsString()
  mediaWord: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Note of vocabulary',
    example: 'This is a note',
  })
  @AutoMap()
  note: string;
}
