import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.OrderCreateArgs) {
    return this.prismaService.order.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.OrderFindUniqueArgs) {
    return this.prismaService.order.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.OrderFindManyArgs) {
    return this.prismaService.order.findMany(findManyDto);
  }

  update(updateDto: Prisma.OrderUpdateArgs) {
    return this.prismaService.order.update(updateDto);
  }

  updateMany(updateManyDto: Prisma.OrderUpdateManyArgs) {
    return this.prismaService.order.updateMany(updateManyDto);
  }

  delete(deleteDto: Prisma.OrderDeleteArgs) {
    return this.prismaService.order.delete(deleteDto);
  }
}
