import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from 'src/module/lesson/dto/create-lesson.dto';
import { UpdateLessonDto } from 'src/module/lesson/dto/update-lesson.dto';
import { Lesson } from 'src/module/lesson/entities/lesson.entity';

@Injectable()
export class LessonProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateLessonDto, Lesson);
      createMap(mapper, UpdateLessonDto, Lesson);
    };
  }
}
