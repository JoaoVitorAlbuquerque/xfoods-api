// import {
//   ConnectedSocket,
//   MessageBody,
//   SubscribeMessage,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { OrdersService } from './orders.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

// export class OrdersGateway {
//   @WebSocketServer() server: Server;

//   constructor(private readonly ordersService: OrdersService) {}

//   @SubscribeMessage('create_order')
//   async create(
//     @ActiveUserId() userId: string,
//     @MessageBody() createOrderDto: CreateOrderDto,
//     @ConnectedSocket() client: Socket,
//   ) {
//     const order = await this.ordersService.create(userId, createOrderDto);

//     this.server.emit('order_created', order, client.id);

//     return order;
//   }
// }
