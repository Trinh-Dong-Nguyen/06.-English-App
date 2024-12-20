import { Lesson } from 'src/module/lesson/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SectionProgress } from './section-progress.entity';
import { Base } from 'src/module/base/base.entity';
import { CourseBuying } from 'src/module/course-buying/entities/course-buying.entity';
import { CourseOwning } from './course-owning.entity';

@Entity()
export class LessonProgress extends Base {
  @ManyToOne(() => Lesson, (lesson) => lesson.lessonProgresses)
  lesson: Lesson;
  @OneToMany(
    () => SectionProgress,
    (sectionProgress) => sectionProgress.lessonProgress,
  )
  sectionProgresses: SectionProgress[];
  @ManyToOne(
    () => CourseOwning,
    (courseOwning) => courseOwning.lessonProgresses,
  )
  courseOwning: CourseBuying;
  @Column({
    default: false,
  })
  isCompleted: boolean;
}
