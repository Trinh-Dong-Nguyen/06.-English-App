import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseProgressDto } from './create-course-progress.dto';

export class UpdateCourseProgressDto extends PartialType(CreateCourseProgressDto) {}
