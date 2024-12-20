import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGrammarDto {
  @AutoMap()
  @ApiProperty({
    description: 'Title of the grammar',
    example: 'Grammar title',
  })
  @IsString()
  title: string;
  @AutoMap()
  @ApiProperty({
    description: 'Description of the grammar',
    example: 'Grammar description',
  })
  @IsString()
  description: string;
  @AutoMap()
  @ApiProperty({
    description: 'Content of the grammar',
    example: 'Grammar content',
  })
  @IsString()
  content: string;
}
