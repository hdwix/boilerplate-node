import { Query, Resolver } from '@nestjs/graphql';
import { PongService } from 'src/domain/services/ping.service';
import { PingDto } from '../dtos/ping-dto';

@Resolver(of => PingDto)
export class PongResolver {
    constructor(private readonly pongService: PongService) {}

    @Query(() => PingDto) // Define the return type of GraphQL query
    getPong(): PingDto {
        return this.pongService.getPong();
    }
}
