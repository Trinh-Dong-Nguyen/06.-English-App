import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { S3Module } from './s3/s3.module';
import { CourseCategoryModule } from './course-category/course-category.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { GrammarModule } from './grammar/grammar.module';
import { QuestionModule } from './question/question.module';
import { QuestionGroupModule } from './question-group/question-group.module';
import { SectionModule } from './section/section.module';
import { HttpModule } from '@nestjs/axios';
import { CourseBuyingModule } from './course-buying/course-buying.module';
import { StudentAnswerModule } from './student-answer/student-answer.module';
import { DiscountModule } from './discount/discount.module';
import { CourseOwningModule } from './course-owning/course-owning.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    S3Module,
    CourseCategoryModule,
    CourseModule,
    LessonModule,
    GrammarModule,
    QuestionModule,
    QuestionGroupModule,
    SectionModule,
    HttpModule,
    CourseBuyingModule,
    StudentAnswerModule,
    DiscountModule,
    CourseOwningModule,
  ],
  exports: [
    AuthModule,
    UserModule,
    S3Module,
    CourseCategoryModule,
    CourseModule,
    LessonModule,
    DiscountModule,
    GrammarModule,
    QuestionModule,
    QuestionGroupModule,
    SectionModule,
    HttpModule,
    CourseBuyingModule,
    StudentAnswerModule,
    CourseOwningModule,
  ],
})
export class SharedModule {}
