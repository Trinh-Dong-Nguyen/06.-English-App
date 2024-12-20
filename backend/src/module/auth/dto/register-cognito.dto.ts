import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCognitoDto {
  @AutoMap()
  @ApiProperty({ description: 'Unique username for the Cognito user' })
  username: string;

  @AutoMap()
  @ApiProperty({ description: 'Email of the Cognito user' })
  email: string;

  @AutoMap()
  @ApiProperty({ description: 'Password for the Cognito user' })
  password: string;

  @AutoMap()
  @ApiProperty({ description: 'Name of the Cognito user' })
  name: string;
}
