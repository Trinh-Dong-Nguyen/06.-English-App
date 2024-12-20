import { Module } from '@nestjs/common';
import { QuestionGroupService } from './question-group.service';
import { QuestionGroupController } from './question-group.controller';
import { QuestionProfile } from 'src/common/mappers/question.profile';

@Module({
  controllers: [QuestionGroupController],
  providers: [QuestionGroupService, QuestionProfile],
})
export class QuestionGroupModule {}
