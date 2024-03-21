// grpc.controller.ts

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcService } from './grpc.service';
import { PingRequest, PingResponse } from './grpc.type';

@Controller()
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  @GrpcMethod('PingerService', 'Ping')
  ping(data: PingRequest): PingResponse {
    return this.grpcService.ping(data);
  }
}
