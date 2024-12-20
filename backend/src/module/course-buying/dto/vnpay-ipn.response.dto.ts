import { IsNotEmpty, IsString } from 'class-validator';

export class VnpayIPNResponse {
  @IsNotEmpty()
  @IsString()
  rspCode: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}
