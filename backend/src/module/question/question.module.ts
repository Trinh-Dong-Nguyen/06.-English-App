import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionProfile } from 'src/common/mappers/question.profile';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuestionProfile],
})
export class QuestionModule {}
