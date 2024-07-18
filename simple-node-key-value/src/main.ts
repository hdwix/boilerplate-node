import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_NAME, APP_PORT } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(APP_PORT);

  console.log(`Running service of ${APP_NAME} on port: ${APP_PORT}`);
}
bootstrap();
