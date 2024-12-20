import { Module } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategoryController } from './course-category.controller';
import { CourseCategoryProfile } from 'src/common/mappers/course-category.profile';

@Module({
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService, CourseCategoryProfile],
})
export class CourseCategoryModule {}
