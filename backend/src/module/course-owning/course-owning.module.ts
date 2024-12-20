import { Module } from '@nestjs/common';
import { CourseOwningService } from './course-owning.service';
import { CourseOwningController } from './course-owning.controller';
import { CourseOwningProfile } from 'src/common/mappers/course-owning.profile';

@Module({
  controllers: [CourseOwningController],
  providers: [CourseOwningService, CourseOwningProfile],
})
export class CourseOwningModule {}
