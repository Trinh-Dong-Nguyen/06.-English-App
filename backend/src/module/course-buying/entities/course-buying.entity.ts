import { PAYMENT_METHOD } from 'src/utils/constants';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Student } from '../../user/entities/student.entity';
import { Course } from 'src/module/course/entities/course.entity';

@Entity()
export class CourseBuying extends Base {
  @Column({
    type: 'enum',
    enum: PAYMENT_METHOD,
    default: PAYMENT_METHOD.QR_CODE,
  })
  paymentMethod: PAYMENT_METHOD;
  @Column()
  key: string;
  @Column('boolean', { default: true })
  active: boolean;
  @ManyToOne(() => Student, (student) => student.courseBuyings)
  student: Student;
  @ManyToOne(() => Course, (course) => course.courseBuyings)
  course: Course;
}
