import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  console.log(`APP_NAME: ${process.env.APP_NAME}`);
  console.log(`APP_PORT: ${process.env.APP_PORT}`);
  console.log(`DB_USERNAME: ${process.env.DB_USERNAME}`);
  console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
  console.log(`DB_HOST: ${process.env.DB_HOST}`);

  // APP_NAME = simple - nest - config;
  // APP_PORT = 3000;
  // DB_USERNAME = example;
  // DB_PASSWORD = example;
  // DB_HOST = localhost;
}
bootstrap();
