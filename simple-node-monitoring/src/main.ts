// Import OpenTelemetry setup as the very first import
import './infrastructure/OpenTelementary/Open-Telementary.setup';
// /home/yadi/Documents/Telkomsel/testing/open-telementary-monitoring/src/infrastructure/OpenTelementary/Open-Telementary.setup.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  const appName = configService.get('APP_NAME');
  await app.listen(3000);
  logger.log(`${appName} is running on: http://localhost:${port}`);
}
bootstrap();
