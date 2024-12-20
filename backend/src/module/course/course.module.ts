import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseProfile } from 'src/common/mappers/course.profile';
import { CourseCategoryService } from '../course-category/course-category.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseProfile, CourseCategoryService],
})
export class CourseModule {}
