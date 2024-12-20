import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createPayOrderUrlDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'courseBuyingId',
    example: '6370e78d-81ad-4d5b-ab23-526b27634382',
  })
  courseBuyingId: string;
}
