// Import OpenTelemetry setup as the very first import
import './infrastructure/OpenTelementary/Open-Telementary.setup';
// /home/yadi/Documents/Telkomsel/testing/open-telementary-monitoring/src/infrastructure/OpenTelementary/Open-Telementary.setup.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  await app.listen(3000);
  logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
