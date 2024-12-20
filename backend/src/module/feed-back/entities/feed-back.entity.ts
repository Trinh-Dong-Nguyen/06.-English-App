import { Base } from 'src/module/base/base.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { Student } from 'src/module/user/entities/student.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class FeedBack extends Base {
  @ManyToOne(() => Student, (student) => student.feedBacks)
  student: Student;
  @ManyToOne(() => Course, (course) => course.feedBacks)
  course: Course;
}
