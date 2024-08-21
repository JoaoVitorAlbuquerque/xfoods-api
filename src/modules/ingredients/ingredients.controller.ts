import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll() {
    return this.ingredientsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ingredientsService.findOne(+id);
  // }

  @Put(':ingredientId')
  update(
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(ingredientId, updateIngredientDto);
  }

  @Delete(':ingredientId')
  @HttpCode(204)
  remove(@Param('ingredientId', ParseUUIDPipe) ingredientId: string) {
    return this.ingredientsService.remove(ingredientId);
  }
}
