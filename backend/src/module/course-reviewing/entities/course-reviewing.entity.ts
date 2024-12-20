import { Base } from 'src/module/base/base.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { Student } from 'src/module/user/entities/student.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CourseReviewing extends Base {
  @Column()
  content: string;
  @Column('float')
  rating: number;
  @Column('float')
  currentProgress: number;
  @ManyToOne(() => Course, (course) => course.courseReviewings)
  course: Course;
  @ManyToOne(() => Student, (student) => student.courseReviewings)
  student: Student;
}
