import { Section } from 'src/module/section/entities/section.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LessonProgress } from './lesson-progress.entity';
import { Base } from 'src/module/base/base.entity';
import { AutoMap } from '@automapper/classes';
import { CourseOwning } from './course-owning.entity';

@Entity()
export class SectionProgress extends Base {
  @ManyToOne(() => Section, (section) => section.sectionProgresses)
  section: Section;
  @Column({
    default: false,
  })
  @AutoMap()
  isCompleted: boolean;

  @ManyToOne(
    () => LessonProgress,
    (lessonProgress) => lessonProgress.sectionProgresses,
  )
  lessonProgress: LessonProgress;
  @ManyToOne(
    () => CourseOwning,
    (courseOwning) => courseOwning.sectionProgresses,
  )
  courseOwning: CourseOwning;
}
