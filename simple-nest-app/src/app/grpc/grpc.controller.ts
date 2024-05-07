import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { PongService } from "src/domain/services/ping.service";
import { PingDto } from "../dtos/ping-dto";

@Controller()
export class GrpcController {
    constructor(private readonly pongService: PongService) {}

    @GrpcMethod('PongService', 'GetPong')
    getPong(_empty: any): PingDto {
        return this.pongService.getPong();
    }
}