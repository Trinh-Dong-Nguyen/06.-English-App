import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendConfirmationCodeDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username for resending confirmation code' })
  username: string;
}
