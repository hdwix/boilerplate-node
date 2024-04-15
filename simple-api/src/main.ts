import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes } from 'class-validator';
import { PipesConsumer } from '@nestjs/core/pipes';
import { ValidationPipe } from '@nestjs/common';
import { APP_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  console.log('Running on port: ', APP_PORT);
}
bootstrap();
