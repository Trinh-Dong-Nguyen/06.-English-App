import { DiscountType } from '../../../types/discount';

import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountRequest {
  @ApiProperty({
    description: 'Type of discount',
    enum: DiscountType,
    example: DiscountType.OWNER,
  })
  @IsEnum(DiscountType)
  type: DiscountType;
  @ApiProperty({
    description: 'Percentage of discount',
    type: Number,
    example: 10,
  })
  @IsNumber()
  percentage: number;
  @ApiProperty({
    description: 'Code of discount',
    type: String,
    example: 'DISCOUNT10',
  })
  @IsString()
  code: string;
  @ApiProperty({
    description: 'Flat amount of discount',
    type: Number,
    example: 10,
  })
  @IsNumber()
  flatAmount: number;
  @ApiProperty({
    description: 'Start date of discount',
    type: String,
    example: '2021-10-10',
  })
  @IsString()
  startDate: string;
  @ApiProperty({
    description: 'End date of discount',
    type: String,
    example: '2021-10-20',
  })
  @IsString()
  endDate: string;
  @ApiProperty({
    description: 'Course ids of discount',
    type: [String],
    example: ['14c495aa-83f2-498a-a812-da253eaddf5f'],
  })
  @IsString({ each: true })
  courseIds: string[];
  @ApiProperty({
    description: 'Usage of discount',
    type: Number,
    example: 100,
  })
  @IsNumber()
  usageLimit: number;
}
