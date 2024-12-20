import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseOwningDto {
  @ApiProperty({
    example: '',
    description: 'The id of the course',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  courseId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  expiredDate: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @AutoMap()
  active: boolean = true;
}
