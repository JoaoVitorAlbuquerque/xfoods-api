import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from 'src/shared/database/repositories/products.repositories';
import * as path from 'node:path';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, imagePath, price, ingredientIds, category } =
      createProductDto;

    const parsedIngredientIds = ingredientIds.map((id) =>
      id
        .trim()
        .replace(/^\["|"\]$/g, '')
        .replace(/^"|"$/g, '')
        .replace(/^\"|\"$/g, '')
        .trim(),
    );

    console.log({ service: imagePath });
    console.log({ ingredientIds: parsedIngredientIds });

    return this.productsRepo.create({
      data: {
        name,
        description,
        imagePath,
        price,
        category: {
          connect: { id: category },
        },
        ingredients: {
          create: parsedIngredientIds.map((ingredientId) => ({
            ingredient: {
              connect: { id: ingredientId },
            },
          })),
        },
        // categoryId,
      },
      include: {
        category: {
          select: {
            icon: true,
            name: true,
          },
        },
        ingredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });
  }

  // async create(createProductDto: CreateProductDto, categoryId: string) {
  //   const { name, description, imagePath, price, ingredientIds } =
  //     createProductDto;

  //   const parsedIngredientIds = ingredientIds.map((id) =>
  //     id
  //       .trim()
  //       .replace(/^\["|"\]$/g, '')
  //       .replace(/^"|"$/g, '')
  //       .replace(/^\"|\"$/g, '')
  //       .trim(),
  //   );

  //   console.log({ service: imagePath });
  //   console.log({ ingredientIds: parsedIngredientIds });

  //   return this.productsRepo.create({
  //     data: {
  //       name,
  //       description,
  //       imagePath,
  //       price,
  //       ingredients: {
  //         create: parsedIngredientIds.map((ingredientId) => ({
  //           ingredient: {
  //             connect: { id: ingredientId },
  //           },
  //         })),
  //       },
  //       categoryId,
  //     },
  //     include: {
  //       category: {
  //         select: {
  //           icon: true,
  //           name: true,
  //         },
  //       },
  //       ingredients: {
  //         select: {
  //           ingredient: true,
  //         },
  //       },
  //     },
  //   });
  // }

  findAll() {
    return this.productsRepo.findMany({
      where: { deleted: false },
      select: {
        id: true,
        name: true,
        description: true,
        imagePath: true,
        price: true,
        category: true,
        ingredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });
  }

  findProductsByCategoy(categoryId: string) {
    return this.productsRepo.findProductsByCategory({
      where: { categoryId, deleted: false },
      include: {
        category: true,
        ingredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    const { name, description, price, imagePath, ingredientIds, category } =
      updateProductDto;

    {
      /* O preço não está chegando como number */
    }

    const updateData: UpdateProductDto = {
      name,
      description,
      price,
      category,
      // imagePath,
    };

    if (file) {
      updateData.imagePath = path.join('uploads', file.originalname);
    }

    // Atualização dos campos básicos dos produtos
    const { category: categoryId, ...rest } = updateData;
    await this.productsRepo.update({
      where: { id: productId },
      data: {
        ...rest,
        price,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        category: true,
      },
    });

    // Atualizando a relação de ingredientes
    if (ingredientIds) {
      const parsedIngredientIds = ingredientIds.map((id) =>
        id
          .trim()
          .replace(/^\["|"\]$/g, '')
          .replace(/^"|"$/g, '')
          .replace(/^\"|\"$/g, '')
          .trim(),
      );

      await this.productsRepo.update({
        where: { id: productId },
        data: {
          ingredients: {
            create: parsedIngredientIds.map((ingredientId) => ({
              ingredient: {
                connect: { id: ingredientId },
              },
            })),
          },
        },
        include: {
          ingredients: {
            select: {
              ingredient: true,
            },
          },
        },
      });
    }

    // Retornando o produto atualizado com as relações incluídas
    return this.productsRepo.findUnique({
      where: { id: productId },
      include: {
        category: true,
        ingredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });
  }

  async remove(productId: string) {
    await this.productsRepo.delete({
      where: { id: productId },
    });

    return null;
  }

  async softDelete(productId: string) {
    return this.productsRepo.update({
      where: { id: productId },
      data: { deleted: true },
    });
  }
}
