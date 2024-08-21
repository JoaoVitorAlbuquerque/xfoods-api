import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repositories';

@Injectable()
export class ValidateOrderOwnershipService {
  constructor(private readonly ordersRepo: OrdersRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.ordersRepo.findUnique({
      where: { id: bankAccountId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
