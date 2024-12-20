import { IsOptional, IsString } from 'class-validator';
import { CoursePaginatedQuery } from './course-paginated-query.dto';
import { ApiProperty } from '@nestjs/swagger';
export class GetAllCourseQuery extends CoursePaginatedQuery {
  @ApiProperty({
    required: false,
    description: 'Category id',
    example: '493ff37a-136c-4607-af3d-f5bc1c35f718',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
