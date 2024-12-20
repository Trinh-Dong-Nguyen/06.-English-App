import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseReviewingDto } from './create-course-reviewing.dto';

export class UpdateCourseReviewingDto extends PartialType(
  CreateCourseReviewingDto,
) {}
