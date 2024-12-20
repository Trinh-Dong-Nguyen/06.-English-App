import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class AddGrammarToLessonDto {
  @AutoMap()
  @IsArray()
  @ApiProperty({
    type: Array<string>,
    description: 'List of grammar ids',
    example: [
      'd3c6a450-0dee-47e3-85a7-77b94d9be821',
      '5c125959-dfdf-413a-b4c8-48033ad6a1a0',
    ],
  })
  grammarIds: string[];
}
