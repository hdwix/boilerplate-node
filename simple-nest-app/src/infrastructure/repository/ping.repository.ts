import { Inject, Injectable } from "@nestjs/common";
import { PingDto } from "../../app/dtos/ping-dto";
import { USER_MODEL_PROVIDER } from "../..//constants";
import { Ping } from "../../domain/entities/ping.entity";
import { PingModel } from "../models/ping.model";

@Injectable()
export class PingRepository {
    constructor(@Inject(USER_MODEL_PROVIDER) private readonly model: Ping) {}

    ping(ping: PingDto): Ping {
        const newPing = new PingModel(ping)
        return newPing;
    }
}