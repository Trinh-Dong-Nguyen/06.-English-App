import { Module } from '@nestjs/common';
import { CourseProgressService } from './course-progress.service';
import { CourseProgressController } from './course-progress.controller';

@Module({
  controllers: [CourseProgressController],
  providers: [CourseProgressService],
})
export class CourseProgressModule {}
