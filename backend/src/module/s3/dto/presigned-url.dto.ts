import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PresignedUrlDto {
  @ApiProperty()
  @IsString()
  contentType: string;

  @ApiProperty()
  @IsString()
  extension: string;
}
