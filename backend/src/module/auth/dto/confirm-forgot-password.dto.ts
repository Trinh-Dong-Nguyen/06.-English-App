import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class ConfirmForgotPasswordDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username for confirming forgot password' })
  username: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirmation code for confirming forgot password',
  })
  confirmationCode: string;
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'New password for confirming forgot password' })
  newPassword: string;
}
