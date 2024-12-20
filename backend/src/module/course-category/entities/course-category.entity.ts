import { AutoMap } from '@automapper/classes';
import { Base } from 'src/module/base/base.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class CourseCategory extends Base {
  @Column()
  @AutoMap()
  name: string;

  @OneToMany(() => Course, (course) => course.category)
  course: Course[];
}
