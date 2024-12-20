import { Base } from '../../base/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Grammar extends Base {
  @Column()
  @AutoMap()
  title: string;
  @Column()
  @AutoMap()
  description: string;
  @Column('text')
  @AutoMap()
  content: string;
  @ManyToMany(() => Lesson, (lesson) => lesson.grammars)
  lessons?: Lesson[];
}
