import { AutoMap } from '@automapper/classes';
import { Base } from 'src/module/base/base.entity';
import { Question } from 'src/module/question/entities/question.entity';
import { Section } from 'src/module/section/entities/section.entity';
import { QUESTION_GROUP_TYPE } from 'src/utils/constants';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class QuestionGroup extends Base {
  @AutoMap()
  @ManyToOne(() => Section, (section) => section.questionGroups)
  section: Section;
  @AutoMap()
  @Column({
    default: QUESTION_GROUP_TYPE.COMBO_BOX,
  })
  questionGroupType: QUESTION_GROUP_TYPE;
  @AutoMap()
  @Column()
  text: string;
  @AutoMap()
  @OneToMany(() => Question, (question) => question.questionGroup, {
    cascade: true,
  })
  questions: Question[];
}
