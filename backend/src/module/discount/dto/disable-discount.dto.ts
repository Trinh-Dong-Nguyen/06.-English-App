import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class disableDiscountRequest {
  @ApiProperty({
    description: 'Discount id',
    type: Number,
    example: 1,
  })
  @IsNumber()
  discountId: number;
}
