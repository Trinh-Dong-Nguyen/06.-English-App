import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Question } from 'src/module/question/entities/question.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Answer extends Base {
  @AutoMap()
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
  @AutoMap()
  @Column()
  text: string;
  @AutoMap()
  @Column('boolean', { default: true })
  isCorrect: boolean;
}
