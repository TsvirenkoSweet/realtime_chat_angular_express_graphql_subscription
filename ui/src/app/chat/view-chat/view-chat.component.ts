import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ChatService, IMessage } from "../shared/chat.service";

@Component({
  selector: 'app-view-chat',
  templateUrl: './view-chat.component.html',
  styleUrls: ['./view-chat.component.scss']
})
export class ViewChatComponent implements OnInit {
  @ViewChild('scrollBottomEl', { static: false })
  scrollBottomEl!: ElementRef;

  messages: Array<IMessage> = [];

  constructor(private chatService: ChatService) {}

  newChatEvent$ = this.chatService.newChatEvent().subscribe(({ messageSent }) => {
    if (messageSent) this.messages.push(messageSent);
    setTimeout(() => {
      this.scrollToBottom()
    }, 0);
  })

  ngOnInit() {
    this.chatService.getChats().subscribe(({ getChats }) => {
      if (getChats) this.messages = getChats.map((x: IMessage) => x);
    })
  }

  private scrollToBottom(): void {
    this.scrollBottomEl.nativeElement.scroll({
      top: this.scrollBottomEl.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
