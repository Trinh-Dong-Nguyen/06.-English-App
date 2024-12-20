import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateCourseCategoryDto } from 'src/module/course-category/dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from 'src/module/course-category/dto/update-course-category.dto';
import { CourseCategory } from 'src/module/course-category/entities/course-category.entity';

@Injectable()
export class CourseCategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CourseCategory, CreateCourseCategoryDto);
      createMap(mapper, CreateCourseCategoryDto, CourseCategory);
      createMap(mapper, UpdateCourseCategoryDto, CourseCategory);
    };
  }
}
