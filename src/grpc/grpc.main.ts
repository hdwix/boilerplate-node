import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from '../app.module';
import { join } from 'path';

export function grpcMain(app: INestApplication) {
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'pinger',
        protoPath: join(__dirname, 'pinger.proto'),
        url: 'localhost:50051',
    },
  };
  
  const grpcServer = app.connectMicroservice(microserviceOptions);
  
  

  app.startAllMicroservices();
}
