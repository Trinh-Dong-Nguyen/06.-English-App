import { Module } from '@nestjs/common';
import { CourseBuyingService } from './course-buying.service';
import { CourseBuyingController } from './course-buying.controller';
import { CourseBuyingProfile } from 'src/common/mappers/course-buying.profile';

@Module({
  controllers: [CourseBuyingController],
  providers: [CourseBuyingService, CourseBuyingProfile],
})
export class CourseBuyingModule {}
