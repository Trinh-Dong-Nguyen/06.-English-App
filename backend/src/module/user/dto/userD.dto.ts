import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLES } from '../../../utils/constants';

export class UserDto {
  @AutoMap()
  id: string;
  @AutoMap()
  @ApiProperty({
    description: 'Role of the user',
    enum: USER_ROLES,
    example: 'TEACHER',
  })
  role: USER_ROLES;

  @AutoMap()
  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @AutoMap()
  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;

  @AutoMap()
  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @AutoMap()
  @ApiProperty({ description: 'Phone number of the user' })
  phone: string;

  @AutoMap()
  @ApiProperty({ description: 'Date of birth of the user' })
  birthDate: Date;

  @AutoMap()
  @ApiProperty({ description: 'Key to the avatar image of the user' })
  avatarKey: string;

  @AutoMap()
  @ApiProperty({ description: 'Date when the user was created' })
  createDate: Date;

  @AutoMap()
  @ApiProperty({ description: 'Date when the user was last updated' })
  updateDate: Date;
}
