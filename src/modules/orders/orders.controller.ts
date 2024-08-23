import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  Patch,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get('/dashboard')
  findAllDashboard() {
    return this.ordersService.findAllDashboard();
  }

  @Get('/history')
  findAllHistory(
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {
    return this.ordersService.findAllHistory({ month, year });
  }

  @Put(':orderId')
  update(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, updateOrderDto);
  }

  @Patch(':orderId/order-status')
  async updateOrderStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.ordersService.updateStatus(
      orderId,
      updateOrderStatusDto,
    );

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return { message: 'Order successfully updated' };
  }

  @Patch('/restarted')
  async updateOrderRestarted() {
    const order = await this.ordersService.updateRestarted();

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    return { message: 'Order successfully updated' };
  }

  @Delete(':orderId')
  @HttpCode(204)
  remove(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.remove(orderId);
  }
}
