import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { ViewChatComponent } from './view-chat/view-chat.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    MessagesComponent,
    CreateMessageComponent,
    ViewChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    MessagesComponent,
    CreateMessageComponent,
    ViewChatComponent
  ]
})

export class ChatModule { }
