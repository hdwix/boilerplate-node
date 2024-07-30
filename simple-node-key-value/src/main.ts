import { NestFactory } from '@nestjs/core';
import { APP_NAME, APP_PORT } from './constants';
import { ValidationPipe } from '@nestjs/common';
import { HelloModule } from './hello.module';
import { ResponseInterceptor } from './app/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(HelloModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(APP_PORT);

  console.log(`Running service of ${APP_NAME} on port: ${APP_PORT}`);
}
bootstrap();
