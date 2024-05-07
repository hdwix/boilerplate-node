import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() 
class MetaType {
    @Field(() => Int)
    code: number;

    @Field(() => String)
    message: string;
}

@ObjectType() 
export class PingDto {
    @Field(() => String) 
    data: string;

    @Field(() => MetaType) 
    meta: MetaType;
}
