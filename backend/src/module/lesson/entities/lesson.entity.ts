import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { LessonVocabulary } from './lesson-vocabulary.entity';
import { Grammar } from '../../grammar/entities/grammar.entity';
import { Section } from 'src/module/section/entities/section.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { AutoMap } from '@automapper/classes';
import { LessonProgress } from 'src/module/course-owning/entities/lesson-progress.entity';

@Entity()
export class Lesson extends Base {
  @Column()
  @AutoMap()
  name: string;
  @Column()
  @AutoMap()
  description: string;
  @Column('text')
  @AutoMap()
  content: string;
  @OneToMany(
    () => LessonVocabulary,
    (lessonVocabulary) => lessonVocabulary.lesson,
    {
      cascade: true,
    },
  )
  lessonVocabularies?: LessonVocabulary[];
  @OneToMany(() => Section, (section) => section.lesson)
  sections?: Section[];
  @ManyToMany(() => Grammar, (grammar) => grammar.lessons)
  @JoinTable()
  grammars?: Grammar[];
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
  @OneToMany(() => LessonProgress, (lessonProgress) => lessonProgress.lesson)
  lessonProgresses: LessonProgress[];
}
