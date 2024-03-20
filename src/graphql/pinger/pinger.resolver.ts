import { Module } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { PingerType } from "./pinger.type";


@Resolver(of => PingerType)
export class PingerResolver {
    @Query(returns => PingerType)
    Pinger() {
        return {
            ping: 'pong',

        }
    }

}