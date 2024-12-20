import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UpdateAnswerDto } from 'src/module/answer/dto/update-answer.dto';
import { CreateGrammarDto } from 'src/module/grammar/dto/create-grammar.dto';
import { Grammar } from 'src/module/grammar/entities/grammar.entity';

@Injectable()
export class GrammarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateGrammarDto, Grammar);
      createMap(mapper, UpdateAnswerDto, Grammar);
    };
  }
}
