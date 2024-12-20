import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateCourseBuyingDto } from 'src/module/course-buying/dto/create-course-buying.dto';
import { CourseBuying } from 'src/module/course-buying/entities/course-buying.entity';

@Injectable()
export class CourseBuyingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateCourseBuyingDto, CourseBuying);
    };
  }
}
