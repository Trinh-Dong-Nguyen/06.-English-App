import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Lesson } from './lesson.entity';
import { AutoMap } from '@automapper/classes';
import { WORD_TYPE } from 'src/utils/constants';

@Entity()
export class LessonVocabulary extends Base {
  @Column()
  @AutoMap()
  vocabulary: string;
  @Column('text')
  @AutoMap()
  note: string;
  @Column({
    enum: WORD_TYPE,
    default: WORD_TYPE.NOUN,
  })
  @AutoMap()
  wordType: WORD_TYPE;
  @Column({
    nullable: true,
  })
  @AutoMap()
  mediaWord: string;
  @ManyToOne(() => Lesson, (lesson) => lesson.lessonVocabularies)
  lesson: Lesson;
}
