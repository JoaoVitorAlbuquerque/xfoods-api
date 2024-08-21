import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  imagePath?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString() //
  @IsUUID() //
  category: string; //

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  ingredientIds?: string[];
}
