import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    const { name, icon } = createCategoryDto;

    return this.categoriesRepo.create({
      data: {
        name,
        icon,
      },
    });
  }

  findAll() {
    return this.categoriesRepo.findMany({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, icon } = updateCategoryDto;

    return this.categoriesRepo.update({
      where: { id: categoryId },
      data: { name, icon },
    });
  }

  async remove(categoryId: string) {
    await this.categoriesRepo.delete({
      where: { id: categoryId },
    });

    return null;
  }
}
