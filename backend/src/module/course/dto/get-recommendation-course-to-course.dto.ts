import { IsNotEmpty, IsString } from 'class-validator';
import { CoursePaginatedQuery } from './course-paginated-query.dto';

export class GetRecommendationCourseToCourseDto extends CoursePaginatedQuery {
  @IsString()
  @IsNotEmpty()
  courseId: string;
}
