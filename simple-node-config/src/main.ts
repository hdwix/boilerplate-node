import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsulConfigService } from './infrastructure/consul/consul-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConsulConfigService);
  const port = (await configService.getKey('APP_PORT')) || 3000; // 9999
  await app.listen(port);
}

bootstrap();
