import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { register } from 'prom-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .getHttpAdapter()
    .getInstance()
    .get('/metrics', async (req, res) => {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    });
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  const appName = configService.get('APP_NAME');
  await app.listen(3000);
  logger.log(`${appName} is running on: http://localhost:${port}`);
}
bootstrap();
