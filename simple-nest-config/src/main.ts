import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  const app_name = configService.get<String>('APP_NAME');
  

  await app.listen(port);
  console.log(`Application is running on PORT: ${port}`);
  console.log(`Application name: ${app_name}`);
}

bootstrap();
