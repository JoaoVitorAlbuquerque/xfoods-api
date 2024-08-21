import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
}
