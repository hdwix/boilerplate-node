import { Controller, Get } from "@nestjs/common";
import { PingDto } from "src/app/dtos/ping-dto";
import { Ping } from "src/domain/entities/ping.entity";
import { PingService } from "src/domain/services/ping.service";

@Controller()
export class RestPingController {
    constructor(private readonly service: PingService) {}

    @Get('ping')
    getPing(ping: PingDto): Ping {
        return this.service.ping(ping);
    }

}