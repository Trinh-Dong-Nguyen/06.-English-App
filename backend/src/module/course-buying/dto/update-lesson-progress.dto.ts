import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateLessonProgress {
  @IsString()
  @ApiProperty({
    description: 'Lesson Id',
    required: true,
  })
  lessonId: string;
}
