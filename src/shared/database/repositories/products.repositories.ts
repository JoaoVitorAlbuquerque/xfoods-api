import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ProductCreateArgs) {
    return this.prismaService.product.create(createDto);
  }

  findProductsByCategory(findManyDto: Prisma.ProductFindManyArgs) {
    return this.prismaService.product.findMany(findManyDto);
  }

  findMany(findManyDto: Prisma.ProductFindManyArgs) {
    return this.prismaService.product.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.ProductFindUniqueArgs) {
    return this.prismaService.product.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.ProductUpdateArgs) {
    return this.prismaService.product.update(updateDto);
  }

  delete(deleteDto: Prisma.ProductDeleteArgs) {
    return this.prismaService.product.delete(deleteDto);
  }
}
