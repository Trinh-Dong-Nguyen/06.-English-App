import {
  Entity,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export abstract class Base extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @AutoMap()
  @CreateDateColumn()
  createDate: Date;
  @AutoMap()
  @UpdateDateColumn()
  updateDate: Date;
}
