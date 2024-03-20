import { Module } from '@nestjs/common';
import AppController from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PingerResolver } from './graphql/pinger/pinger.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    PingerResolver,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
