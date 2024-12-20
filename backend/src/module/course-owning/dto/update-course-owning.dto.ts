import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseOwningDto } from './create-course-owning.dto';

export class UpdateCourseOwningDto extends PartialType(CreateCourseOwningDto) {}
