import { Injectable } from '@angular/core';
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import conversationMessageFragment from './conversation-message-fragment.gql';

@Injectable({
  providedIn: 'root'
})
export class RetrieveMessagesService extends Query<Response> {
  override document = gql`
      query GetChats {
          getChats {
              ...conversationMessage
          }
      }
      ${conversationMessageFragment}
  `;
}
