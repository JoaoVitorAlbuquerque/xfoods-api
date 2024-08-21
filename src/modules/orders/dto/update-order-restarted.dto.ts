import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateOrderRestartedDto {
  @IsBoolean()
  @IsNotEmpty()
  restarted: boolean;
}
