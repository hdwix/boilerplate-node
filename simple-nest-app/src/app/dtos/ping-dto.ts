import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Defining the MetaType as a GraphQL type first
class MetaType {
    @Field(() => Int)
    code: number;

    @Field(() => String)
    message: string;
}

@ObjectType() // This makes the class a GraphQL type
export class PingDto {
    @Field(() => String) // Specifying the return type as GraphQL string
    data: string;

    @Field(() => MetaType) // Correctly refer to MetaType after its declaration
    meta: MetaType;
}
