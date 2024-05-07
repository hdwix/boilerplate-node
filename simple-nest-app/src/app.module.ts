import { Module } from '@nestjs/common';
import { RestController } from './app/rest/controllers/ping.controller';
import { PongService } from './domain/services/ping.service';
import { GrpcController } from './app/grpc/grpc.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { PongResolver } from './app/graphql/pong.resolver';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      
    }),
  ],
  controllers: [RestController, GrpcController],
  providers: [PongService, PongResolver],
})
export class AppModule {}
