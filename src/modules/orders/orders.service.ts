import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repositories';
import { OrdersOnProductsRepository } from 'src/shared/database/repositories/orders-on-products.repositories';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepo: OrdersRepository,
    private readonly ordersOnProductsRepo: OrdersOnProductsRepository,
  ) {}

  create(userId: string, createOrderDto: CreateOrderDto) {
    const { table, description, products, date } = createOrderDto;

    return this.ordersRepo.create({
      data: {
        userId,
        table,
        description,
        date,
        products: {
          create: products.map((product) => ({
            productId: product.product,
            size: product.size,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  findAllDashboard() {
    return this.ordersRepo.findMany({
      where: { restarted: false },
      orderBy: { date: 'asc' },
      include: {
        products: {
          select: {
            product: {
              select: {
                categoryId: true,
                description: true,
                imagePath: true,
                name: true,
                price: true,
                ingredients: {
                  include: {
                    ingredient: true,
                  },
                },
              },
            },
            size: true,
            quantity: true,
          },
        },
      },
    });
  }

  findAllHistory(filters: { month: number; year: number }) {
    return this.ordersRepo.findMany({
      where: {
        restarted: true,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      orderBy: { date: 'asc' },
      include: {
        products: {
          select: {
            product: {
              select: {
                categoryId: true,
                description: true,
                imagePath: true,
                name: true,
                price: true,
                ingredients: {
                  include: {
                    ingredient: true,
                  },
                },
              },
            },
            size: true,
            quantity: true,
          },
        },
      },
    });
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const { table, description, products } = updateOrderDto;

    // Atualização dos campos básicos.
    const updateData: any = {};
    if (table !== undefined) updateData.table = table;
    if (description !== undefined) updateData.description = description;

    const updatedOrder = await this.ordersRepo.update({
      where: { id: orderId },
      data: updateData,
      include: {
        products: true,
      },
    });

    // Atualiza a relação de produtos, se fornecida.
    if (products) {
      const cleanedProductIds = products.map((product) => ({
        productId: product.product,
        size: product.size,
        quantity: product.quantity,
      }));

      // Removendo todos os produtos existentes.
      await this.ordersOnProductsRepo.deleteMany({
        where: { orderId: orderId },
      });

      // Adcionando os novos produtos.
      await this.ordersOnProductsRepo.createMany({
        data: cleanedProductIds.map((product) => ({
          orderId: orderId,
          ...product,
        })),
      });
    }

    // Retorna o pedido atualizado com as relações incluídas
    return this.ordersRepo.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateStatus(
    productId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersRepo.update({
      where: { id: productId },
      data: { status: updateOrderStatusDto.status },
    });
  }

  async updateRestarted() {
    return this.ordersRepo.updateMany({
      where: { restarted: false },
      data: { restarted: true },
    });
  }

  async remove(orderId: string) {
    await this.ordersRepo.delete({
      where: { id: orderId },
    });

    return null;
  }
}
