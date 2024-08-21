import 'dotenv/config';

import * as path from 'node:path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
// import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const server = http.createServer(app.getHttpServer());
  // const server = app.getHttpServer();
  // const io = new Server(server, {
  //   cors: {
  //     origin: '*',
  //   },
  // });

  // io.on('connect', () => {
  //   console.log('Conectou!');
  // });

  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  await app.listen(3000);
}
bootstrap();
