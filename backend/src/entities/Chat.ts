import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Chat {
    @Field(() => String)
    id: string;

    @Field(() => String)
    message: string;

    @Field(() => String)
    name: string;
}