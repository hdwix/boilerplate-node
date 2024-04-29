import { Inject, Injectable } from "@nestjs/common";
import { PingDto } from "src/app/dtos/ping-dto";
import { USER_MODEL_PROVIDER } from "src/constants";
import { Ping } from "src/domain/entities/ping.entity";
import { PingModel } from "../models/ping.model";

@Injectable()
export class PingRepository {
    constructor(@Inject(USER_MODEL_PROVIDER) private readonly model: Ping) {}

    ping(ping: PingDto): Ping {
        const newPing = new PingModel(ping)
        return newPing;
    }
}