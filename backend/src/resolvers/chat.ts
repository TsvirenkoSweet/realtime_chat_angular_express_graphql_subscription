import {Arg, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription} from "type-graphql";
import {Chat} from "../entities/Chat";

const chats: Chat[] = [];
const channel = "CHAT_CHANNEL";

@Resolver()
export class ChatResolver {
    @Query(() => [Chat])
    getChats(): Chat[] {
        return chats;
    }

    @Mutation(() => Chat)
    async createChat(
        @PubSub() pubSub: PubSubEngine,
        @Arg("name", () => String) name: string,
        @Arg("message", () => String) message: string
    ): Promise<Chat> {
        const chat = { id: '0000' + `${chats.length + 1}`, name, message };
        chats.push(chat);
        await pubSub.publish(channel, chat);
        return chat;
    }

    @Subscription(() => Chat, { topics: channel })
    messageSent(@Root() { id, name, message }: Chat): Chat {
        return { id, name, message };
    }
}
