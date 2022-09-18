import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Chat } from "../entities/Chat";

const chats: Chat[] = [];

@Resolver()
export class ChatResolver {
    @Query(() => [Chat])
    getChats(): Chat[] {
        return chats;
    }

    @Mutation(() => Chat)
    createChat(
        @Arg("name", () => String) name: string,
        @Arg("message", () => String) message: string
    ): Chat {
        const chat = { id: '0000' + `${chats.length + 1}`, name, message };
        chats.push(chat);
        return chat;
    }
}
