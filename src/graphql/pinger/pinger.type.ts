import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Pinger')
export class PingerType {
    // @Field(Type => ID)
    // id: string;

    // Ping
    @Field()
    ping: string;
    
    // @Field()
    // startDate: string;

    // @Field()
    // endDate: string;
}