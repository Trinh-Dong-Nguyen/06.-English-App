import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseViewingDto } from './create-course-viewing.dto';

export class UpdateCourseViewingDto extends PartialType(CreateCourseViewingDto) {}
