import { Controller, Get } from "@nestjs/common";
import { PingDto } from "../../../app/dtos/ping-dto";
import {PongService } from "../../../domain/services/ping.service";

@Controller('rest')
export class RestController {
    constructor(private readonly pongService: PongService) {}

    @Get()
    getPong(): PingDto {
        return this.pongService.getPong();
    }
}