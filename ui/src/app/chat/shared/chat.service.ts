import { Injectable } from '@angular/core';
import { gql } from 'graphql-request';
import { Observable } from 'rxjs';
import { GraphQLService } from './graphql.service';

export interface IMessage {
  id: string;
  name: string;
  message: string;
  getChats?: IMessage;
  messageSent?: IMessage;
}

const MESSAGE_FRAGMENT = 'id message name';

@Injectable({ providedIn: 'root' })
export class ChatService {
  chatIndex: number = 0;

  constructor(
    private gqlService: GraphQLService
  ) { }

  getChats(): Observable<any> {
    const query = gql`
            query GetChats {
                getChats {
                    ${MESSAGE_FRAGMENT}
                }
            }
        `
    return this.gqlService.fetch(query)
  }

  createMessage(text: string): Observable<IMessage> {
    const query = gql`
            mutation createChat {
              createChat(name: "Message #${this.chatIndex++}", message: "${text.replace('\n', '')}") {
                 ${MESSAGE_FRAGMENT}
              }
            }
        `
    return this.gqlService.fetch(query)
  }

  newChatEvent(): Observable<IMessage> {
    const query = gql`
            subscription Subscription {
                messageSent {
                   ${MESSAGE_FRAGMENT}
                }
            }
      `
    return this.gqlService.subscription({ query })
  }
}
