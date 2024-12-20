import { Module } from '@nestjs/common';
import { CourseReviewingService } from './course-reviewing.service';
import { CourseReviewingController } from './course-reviewing.controller';

@Module({
  controllers: [CourseReviewingController],
  providers: [CourseReviewingService],
})
export class CourseReviewingModule {}
