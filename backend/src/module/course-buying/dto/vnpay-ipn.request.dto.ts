import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VnpayIPNRequest {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'vnp_Amount',
    example: 1000000,
  })
  vnpAmount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_BankCode',
    example: 'NCB',
  })
  vnpBankCode: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'vnp_BankTranNo',
    example: '123456',
  })
  vnpBankTranNo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_CardType',
    example: 'VISA',
  })
  vnpCardType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_OrderInfo',
    example: 'Thanh toan hoc phi',
  })
  vnpOrderInfo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_PayDate',
    example: '20211019123456',
  })
  vnpPayDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_ResponseCode',
    example: '00',
  })
  vnpResponseCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_TmnCode',
    example: '123456',
  })
  vnpTmnCode: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'vnp_TransactionNo',
    example: 123456,
  })
  vnpTransactionNo: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_TransactionStatus',
    example: '00',
  })
  vnpTransactionStatus: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'vnp_TxnRef',
    example: 10000,
  })
  vnp_TxnRef: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'vnp_SecureHash',
    example: 'test',
  })
  vnpSecureHash: string;
}
