import { Component, OnInit } from '@angular/core';
import { ChatService } from "../shared/chat.service";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  text: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {}

  sendMessage(): boolean | void {
    if (!this.text) {
      return false;
    }

    const textCache = this.text;
    this.text = '';

    this.chatService.createMessage(textCache).subscribe()
  }
}
