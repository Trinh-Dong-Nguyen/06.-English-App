import { Module } from '@nestjs/common';
import { StudentAnswerService } from './student-answer.service';
import { StudentAnswerController } from './student-answer.controller';
import { StudentAnswerProfile } from 'src/common/mappers/student-answer.profile';

@Module({
  controllers: [StudentAnswerController],
  providers: [StudentAnswerService, StudentAnswerProfile],
})
export class StudentAnswerModule {}
