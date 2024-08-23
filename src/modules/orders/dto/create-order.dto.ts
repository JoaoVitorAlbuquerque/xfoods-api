import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OrderType } from '../entities/Order';
import { Type } from 'class-transformer';

class CreateProductOnOrderDto {
  @IsUUID()
  product: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(OrderType)
  size?: OrderType;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  table: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOnOrderDto)
  products: CreateProductOnOrderDto[];
}
