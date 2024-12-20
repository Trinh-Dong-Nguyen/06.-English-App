import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class ForgotPasswordDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username for forgot password' })
  username: string;
}
