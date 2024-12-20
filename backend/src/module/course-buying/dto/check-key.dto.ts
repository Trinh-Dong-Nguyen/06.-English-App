import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckKeyDto {
  @ApiProperty({
    description: 'Key to check',
    example: 'key12345',
  })
  @IsNotEmpty()
  @IsString()
  key: string;
  @ApiProperty({
    description: 'courseBuyingId',
    example: '6370e78d-81ad-4d5b-ab23-526b27634382',
  })
  @IsNotEmpty()
  @IsString()
  courseBuyingId: string;
}
