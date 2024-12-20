import { Base } from '../../base/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { CourseOwning } from '../../course-owning/entities/course-owning.entity';
import { CourseBuying } from '../../course-buying/entities/course-buying.entity';
import { CourseReviewing } from 'src/module/course-reviewing/entities/course-reviewing.entity';
import { StudentAnswer } from 'src/module/student-answer/entities/student-answer.entity';
import { FeedBack } from 'src/module/feed-back/entities/feed-back.entity';

@Entity()
export class Student extends Base {
  @OneToOne(() => User)
  @JoinColumn()
  userInfo: User;
  @OneToMany(() => CourseOwning, (courseOwning) => courseOwning.student)
  courseOwnings: CourseOwning[];
  @OneToMany(() => CourseBuying, (courseBuying) => courseBuying.student)
  courseBuyings: CourseBuying[];
  @OneToMany(
    () => CourseReviewing,
    (courseReviewing) => courseReviewing.student,
  )
  courseReviewings: CourseReviewing[];
  @OneToMany(() => StudentAnswer, (studentAnswer) => studentAnswer.student)
  studentAnswers: StudentAnswer[];
  @OneToMany(() => FeedBack, (feedBack) => feedBack.student)
  feedBacks: FeedBack[];
  @Column({
    nullable: true,
  })
  schoolName?: string;
}
