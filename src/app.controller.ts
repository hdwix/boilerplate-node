import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { grpcController } from './grpc/grpc.controller';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  

  // GRPC, Service = pingService
  @GrpcMethod('PingerService', 'Ping')
  ping(data: any) {
    console.log(data);
    return data;
  }


  // localhost:3000/ping
  @Get('/ping')
  getPong(): { response: number, message: string} {
    return { response: 200, message: 'pong!' };
  }

  
}
