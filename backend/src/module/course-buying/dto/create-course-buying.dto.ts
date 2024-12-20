import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { PAYMENT_METHOD } from 'src/utils/constants';

export class CreateCourseBuyingDto {
  @IsString()
  @AutoMap()
  @ApiProperty({
    description: 'Course id',
    type: String,
    example: 'd1911740-84e0-4778-9c0d-4465dcb1d13e',
  })
  courseId: string;
  @IsEnum(PAYMENT_METHOD)
  @AutoMap()
  @ApiProperty({
    description: 'Payment method',
    enum: PAYMENT_METHOD,
    example: PAYMENT_METHOD.QR_CODE,
  })
  paymentMethod: PAYMENT_METHOD;
}
