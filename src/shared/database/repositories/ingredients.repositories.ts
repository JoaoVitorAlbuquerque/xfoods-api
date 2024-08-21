import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class IngredientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.IngredientCreateArgs) {
    return this.prismaService.ingredient.create(createDto);
  }

  // findUnique(findUniqueDto: Prisma.IngredientFindUniqueArgs) {
  //   return this.prismaService.ingredient.findUnique(findUniqueDto);
  // }

  findMany(findManyDto: Prisma.IngredientFindManyArgs) {
    return this.prismaService.ingredient.findMany(findManyDto);
  }

  update(updateDto: Prisma.IngredientUpdateArgs) {
    return this.prismaService.ingredient.update(updateDto);
  }

  delete(deleteDto: Prisma.IngredientDeleteArgs) {
    return this.prismaService.ingredient.delete(deleteDto);
  }
}
