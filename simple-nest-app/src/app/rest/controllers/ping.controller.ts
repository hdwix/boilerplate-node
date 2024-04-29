import { Controller, Get } from "@nestjs/common";
import { PingDto } from "../../../app/dtos/ping-dto";
import { Ping } from "../../../domain/entities/ping.entity";
import { PingService } from "../../../domain/services/ping.service";

@Controller()
export class RestPingController {
    constructor(private readonly service: PingService) {}

    @Get('ping')
    getPing(ping: PingDto): Ping {
        return this.service.ping(ping);
    }

}