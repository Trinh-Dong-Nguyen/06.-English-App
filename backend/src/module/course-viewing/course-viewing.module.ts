import { Module } from '@nestjs/common';
import { CourseViewingService } from './course-viewing.service';
import { CourseViewingController } from './course-viewing.controller';

@Module({
  controllers: [CourseViewingController],
  providers: [CourseViewingService],
})
export class CourseViewingModule {}
