import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SignInCognitoDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username for signing in', default: 'maikusobu' })
  username: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password for signing in',
    default: '1380621694zZ@',
  })
  password: string;
}
