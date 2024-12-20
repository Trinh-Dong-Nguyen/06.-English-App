import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { STATE } from 'src/utils/constants';

export class CourseResponseDto {
  @ApiProperty({
    example: '14c495aa-83f2-498a-a812-da253eaddf5f',
    description: 'Id of course',
  })
  @AutoMap()
  @IsString()
  id: string;
  @ApiProperty({
    example: 'Course title',
    description: 'Title of course',
  })
  @AutoMap()
  @IsString()
  title: string;
  @ApiProperty({
    example: 'Course description',
    description: 'Description of course',
  })
  @AutoMap()
  @IsString()
  description: string;
  @ApiProperty({
    example: 'Course image',
    description: 'Image of course',
  })
  @AutoMap()
  @IsString()
  thumbnail_image: string;
  @ApiProperty({
    example: 4.5,
    description: 'Average rating of course',
  })
  @AutoMap()
  ratingAverage: number;
  @ApiProperty({
    example: 100,
    description: 'Number of ratings',
  })
  @AutoMap()
  ratingCount: number;
  @ApiProperty({
    example: 'Adam Smith',
    description: 'Name of teacher',
  })
  @ApiProperty({
    example: 'DRAFT',
    description: 'Status of course',
  })
  @AutoMap()
  @IsEnum(STATE)
  state: STATE;
  @AutoMap()
  @IsString()
  teacherName: string;
  @AutoMap()
  @IsString()
  createdAt: string;
  @AutoMap()
  @IsString()
  updatedAt: string;
  @AutoMap()
  @IsString()
  categoryName: string;
}
