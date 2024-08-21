import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientsRepository } from 'src/shared/database/repositories/ingredients.repositories';

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientsRepo: IngredientsRepository) {}

  create(createIngredientDto: CreateIngredientDto) {
    const { icon, name } = createIngredientDto;

    return this.ingredientsRepo.create({
      data: { icon, name },
    });
  }

  findAll() {
    return this.ingredientsRepo.findMany({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} ingredient`;
  // }

  update(ingredientId: string, updateIngredientDto: UpdateIngredientDto) {
    const { icon, name } = updateIngredientDto;

    return this.ingredientsRepo.update({
      where: { id: ingredientId },
      data: {
        icon,
        name,
      },
    });
  }

  async remove(ingredientId: string) {
    await this.ingredientsRepo.delete({
      where: { id: ingredientId },
    });

    return null;
  }
}
