import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'pong',
      protoPath: join(__dirname, '../proto/ping.proto'),
      url: 'localhost:5000'
    },
  });

  await app.startAllMicroservices();
  await app.listen(APP_PORT);
  console.log(`Server running on PORT: ${APP_PORT}`);
}

bootstrap();