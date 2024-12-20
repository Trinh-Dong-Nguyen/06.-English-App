import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Student } from '../../user/entities/student.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { AutoMap } from '@automapper/classes';
import { LessonProgress } from './lesson-progress.entity';
import { SectionProgress } from './section-progress.entity';

@Entity()
export class CourseOwning extends Base {
  @Column()
  @AutoMap()
  expiredDate: Date;
  @Column()
  @AutoMap()
  active: boolean;
  @ManyToOne(() => Course, (course) => course.courseOwnings)
  course: Course;
  @ManyToOne(() => Student, (student) => student.courseOwnings)
  student: Student;
  @OneToMany(
    () => LessonProgress,
    (lessonProgress) => lessonProgress.courseOwning,
  )
  lessonProgresses: LessonProgress[];
  @OneToMany(
    () => SectionProgress,
    (sectionProgress) => sectionProgress.courseOwning,
  )
  sectionProgresses: SectionProgress[];
  @Column({
    default: 0,
  })
  progress: number;
}
