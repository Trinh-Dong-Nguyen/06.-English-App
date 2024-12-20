import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateLessonVocabularyDto } from 'src/module/lesson/dto/create-lesson-vocabulary.dto';
import { UpdateLessonVocabularyDto } from 'src/module/lesson/dto/update-lesson-vocabulary.dto';
import { LessonVocabulary } from 'src/module/lesson/entities/lesson-vocabulary.entity';

@Injectable()
export class LessonVocabularyProfile extends AutomapperProfile {
  private cloudFrontUrl: string;
  constructor(
    @InjectMapper() mapper: Mapper,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super(mapper);
    this.cloudFrontUrl = this.configService.get<string>('cloudFrontURL');
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CreateLessonVocabularyDto,
        LessonVocabulary,
        forMember(
          (src) => src.mediaWord,
          mapFrom((d) => `${this.cloudFrontUrl}/${d.mediaWord}`),
        ),
      );
      createMap(mapper, UpdateLessonVocabularyDto, LessonVocabulary);
    };
  }
}
