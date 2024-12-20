import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmSignUpDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'Confirmation code sent to the user' })
  code: string;
}
