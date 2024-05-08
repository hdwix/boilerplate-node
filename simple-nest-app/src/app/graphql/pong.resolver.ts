import { Query, Resolver } from '@nestjs/graphql';
import { PongService } from '../../domain/services/ping.service';
import { PingDto } from '../dtos/ping-dto';

@Resolver((of) => PingDto)
export class PongResolver {
  constructor(private readonly pongService: PongService) {}

  @Query(() => PingDto)
  getPong(): PingDto {
    return this.pongService.getPong();
  }
}
