import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersOnProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createManyDto: Prisma.ProductOnOrderCreateManyArgs) {
    return this.prismaService.productOnOrder.createMany(createManyDto);
  }

  deleteMany(deleteManyDto: Prisma.ProductOnOrderDeleteManyArgs) {
    return this.prismaService.productOnOrder.deleteMany(deleteManyDto);
  }
}
