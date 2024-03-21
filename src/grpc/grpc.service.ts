// grpc.service.ts

import { INestApplication, Injectable } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class GrpcService {
  ping(data: any) {
    return data;
  }
}



export function grpcMain(app: INestApplication) {
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'ping',
        protoPath: join(__dirname, '/proto/ping.proto'),
        url: 'localhost:50051',
    },
  };
  
  const grpcServer = app.connectMicroservice(microserviceOptions);
  
  

  app.startAllMicroservices();
}