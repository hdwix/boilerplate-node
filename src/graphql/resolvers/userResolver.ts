import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/user";
import { mockUsers } from "../__mocks__/users.mock";

@Resolver()
export class UserResolver {

    @Query((returns) => User, {nullable: true})
    getUserById(@Args('id', {type: () => Int})id: number) {
        return mockUsers.find((user) => user.id === id);
    }

    @Query(() => [User])
    getUsers() {
        return mockUsers;
    }
}