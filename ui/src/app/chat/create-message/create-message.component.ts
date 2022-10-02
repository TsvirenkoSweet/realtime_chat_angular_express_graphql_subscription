import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import conversationMessageFragment from '../shared/conversation-message-fragment.gql';
import { Subscription } from "rxjs";

const GET_CHATS = gql`
      query GetChats {
          getChats {
              ...conversationMessage
          }
      }
      ${conversationMessageFragment}
  `;

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  text: String = '';
  chatIndex = 0;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo) { }

  ngOnInit() {}

  sendMessage(): boolean | void {
    if (!this.text) {
      return false;
    }

    const textCache = this.text;
    this.text = '';

    this.apollo
      .mutate({
        mutation: gql`
            mutation createChat {
              createChat(name: "Chat #${this.chatIndex++}", message: "${textCache.replace('\n', '')}") {
                ...conversationMessage
              }
            }
            ${conversationMessageFragment}
          `
      })
      .subscribe();

    // this.querySubscription = this.apollo.watchQuery<any>({
    //   query: GET_CHATS
    // })
    //   .valueChanges
    //   .subscribe((res) => {
    //     debugger
    //   });
    //
    // this.apollo
    //   .query({
    //     query: gql`
    //       query GetChats {
    //           getChats {
    //               ...conversationMessage
    //           }
    //       }
    //       ${conversationMessageFragment}
    //   `
    // })
    //   .subscribe(res => {
    //     debugger
    //   });
  }
}
