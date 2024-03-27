import { Module } from '@nestjs/common';
import { RestModule } from './rest/rest.module';
import { RestController } from './rest/controllers/rest.controller';
import { RestService } from './rest/services/rest.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/userResolver';

@Module({
  imports: [
    RestModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/graphql/schema/schema.gql'
    }),
  
  ],
  controllers: [RestController],
  providers: [RestService, UserResolver],
})
export class AppModule {}
