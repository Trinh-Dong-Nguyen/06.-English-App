import { USER_ROLES } from 'src/utils/constants';
import { Base } from '../../base/base.entity';
import { Column, Entity } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User extends Base {
  @AutoMap()
  @Column({
    type: 'enum',
    enum: USER_ROLES,
  })
  role: USER_ROLES;
  @AutoMap()
  @Column({
    nullable: true,
  })
  firstName?: string;
  @AutoMap()
  @Column({
    nullable: true,
  })
  lastName?: string;
  @AutoMap()
  @Column()
  email: string;
  @AutoMap()
  @Column({
    nullable: true,
  })
  phone?: string;
  @AutoMap()
  @Column({
    nullable: true,
  })
  birthDate?: Date;
  @AutoMap()
  @Column({
    nullable: true,
  })
  avatarURL?: string;
  @AutoMap()
  @Column()
  awsCognitoId: string;
}
