import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentAnswerDto {
  @ApiProperty({
    description: 'Question ID',
    type: String,
    example: '40ec21fc-9108-48f3-827b-85de9416dda2',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  questionId: string;
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  @ApiProperty({
    description: 'Answer',
    type: String,
    example: 'political',
  })
  answer: string;
}
