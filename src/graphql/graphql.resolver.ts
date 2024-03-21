import { Module } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { GqlService } from "./graphql.service";


@Resolver(of => GqlService)
export class GqlResolver {
    @Query(returns => GqlService)
    ping() {
        return {
            ping: 'pong',

        }
    }

}