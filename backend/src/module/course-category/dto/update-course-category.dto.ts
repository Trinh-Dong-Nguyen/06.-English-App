import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseCategoryDto {
  @AutoMap()
  @ApiProperty({
    description: 'The id of the course category',
    type: String,
    example: 'f2386f08-5a0b-4f17-9a20-f29e4455e700',
  })
  @IsString()
  id: string;
  @AutoMap()
  @ApiProperty({
    description: 'The name of the course category',
    type: String,
    example: 'IELTS Listening',
  })
  @IsString()
  name: string;
}
