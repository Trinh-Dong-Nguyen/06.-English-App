import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetDiscountsByCourseDto {
  @ApiProperty({
    description: 'Course id',
    type: String,
    example: '14c495aa-83f2-498a-a812-da253eaddf5f',
  })
  @IsString()
  courseId: string;
}
