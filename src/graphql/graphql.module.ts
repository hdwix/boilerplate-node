import { Module } from '@nestjs/common';
import { GqlResolver } from './graphql.resolver';

@Module({
    providers: [GqlResolver]
})
export class GqlModule {}
