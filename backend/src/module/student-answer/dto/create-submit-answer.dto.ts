import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateStudentAnswerDto } from './create-student-answer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmitAnswerDto {
  @IsArray()
  @ApiProperty({
    description: 'List of student answers',
    type: [CreateStudentAnswerDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateStudentAnswerDto)
  answers: CreateStudentAnswerDto[];
}
