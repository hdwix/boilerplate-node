import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcMain } from './grpc/grpc.service';
// import { grpcMain } from './grpc/grpc.main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);


  // GRPC
  await app.startAllMicroservices();
  grpcMain(app);

}
bootstrap();
