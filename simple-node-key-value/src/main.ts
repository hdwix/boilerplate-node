import { NestFactory } from '@nestjs/core';
import { APP_NAME, APP_PORT } from './constants';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SampleModule } from './sample.module';
import { ResponseInterceptor } from './app/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(SampleModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(APP_PORT);

  console.log(`Running service of ${APP_NAME} on port: ${APP_PORT}`);
}
bootstrap();
