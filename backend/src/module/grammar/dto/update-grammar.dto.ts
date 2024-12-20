import { PartialType } from '@nestjs/mapped-types';
import { CreateGrammarDto } from './create-grammar.dto';
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGrammarDto extends PartialType(CreateGrammarDto) {
  @AutoMap()
  @IsString()
  @ApiProperty({
    description: 'Grammar name',
  })
  @IsNotEmpty()
  id: string;
}
