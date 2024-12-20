import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonProfile } from 'src/common/mappers/lesson.profile';
import { LessonVocabularyProfile } from 'src/common/mappers/lesson-vocabulary.profile';
import { CourseService } from '../course/course.service';
import { GrammarService } from '../grammar/grammar.service';

@Module({
  controllers: [LessonController],
  providers: [
    LessonService,
    LessonProfile,
    LessonVocabularyProfile,
    CourseService,
    GrammarService,
  ],
})
export class LessonModule {}
