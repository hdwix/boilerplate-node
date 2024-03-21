import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlModule } from './graphql/graphql.module';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    RestModule,
    GqlModule,
    GrpcModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
