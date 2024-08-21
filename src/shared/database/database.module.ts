import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { IngredientsRepository } from './repositories/ingredients.repositories';
import { ProductsRepository } from './repositories/products.repositories';
import { OrdersRepository } from './repositories/orders.repositories';
import { OrdersOnProductsRepository } from './repositories/orders-on-products.repositories';

@Global() // Visível para todos os módulos da aplicação
@Module({
  // Por padrão os módulos são privados
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    IngredientsRepository,
    ProductsRepository,
    OrdersRepository,
    OrdersOnProductsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    IngredientsRepository,
    ProductsRepository,
    OrdersRepository,
    OrdersOnProductsRepository,
  ], // Exportar apenas o que será utilizado
})
export class DatabaseModule {}
