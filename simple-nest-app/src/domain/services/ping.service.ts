import { Injectable } from "@nestjs/common";
import { PingDto } from "src/app/dtos/ping-dto";
import { Ping } from "../entities/ping.entity";
import { PingRepository } from "src/infrastructure/repository/ping.repository";

@Injectable()
export class PingService {
    constructor(private readonly repository: PingRepository) {}

    ping(ping: PingDto): Ping {
        return this.repository.ping(ping);
    }
}