import { AutoMap } from '@automapper/classes';
import { Base } from 'src/module/base/base.entity';
import { CourseBuying } from 'src/module/course-buying/entities/course-buying.entity';
import { CourseCategory } from 'src/module/course-category/entities/course-category.entity';
import { CourseOwning } from 'src/module/course-owning/entities/course-owning.entity';
import { CourseReviewing } from 'src/module/course-reviewing/entities/course-reviewing.entity';
import { FeedBack } from 'src/module/feed-back/entities/feed-back.entity';
import { Lesson } from 'src/module/lesson/entities/lesson.entity';
import { Teacher } from 'src/module/user/entities/teacher.entity';
import { STATE } from 'src/utils/constants';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Course extends Base {
  @Column()
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  title: string;

  @Column('bigint')
  @AutoMap()
  price: number;

  @Column({
    default:
      'https://study4.com/media/courses/Course/files/2023/10/19/phat_am_giao_tiep_1.webp',
  })
  @AutoMap()
  thumbnail_image: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Column({
    type: 'enum',
    enum: STATE,
    default: STATE.DRAFT,
  })
  @AutoMap()
  state: STATE = STATE.DRAFT;

  @ManyToOne(() => CourseCategory, (category) => category.course)
  @JoinColumn({ name: 'categoryId' })
  category: CourseCategory;

  @OneToMany(() => CourseReviewing, (courseReviewing) => courseReviewing.course)
  courseReviewings: CourseReviewing[];

  @OneToMany(() => CourseOwning, (courseOwning) => courseOwning.course)
  courseOwnings: CourseOwning[];

  @OneToMany(() => CourseBuying, (courseBuying) => courseBuying.course)
  courseBuyings: CourseBuying[];

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => FeedBack, (feedBack) => feedBack.course)
  feedBacks: FeedBack[];
}
