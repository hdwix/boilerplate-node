import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('Ping')
export class GqlService {
    @Field()
    ping: string;
}