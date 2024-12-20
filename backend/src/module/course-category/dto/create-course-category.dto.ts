import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseCategoryDto {
  @AutoMap()
  @ApiProperty({
    description: 'The name of the course category',
    type: String,
    example: 'Toeic Listening',
  })
  @IsString()
  name: string;
}
