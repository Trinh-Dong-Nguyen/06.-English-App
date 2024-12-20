import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { GrammarProfile } from 'src/common/mappers/grammar.profile';

@Module({
  controllers: [GrammarController],
  providers: [GrammarService, GrammarProfile],
})
export class GrammarModule {}
