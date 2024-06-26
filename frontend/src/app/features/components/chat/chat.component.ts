import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: any[] = [];
  message: string = '';
  conversationId!: number;
  userCount: number = 0;
  storageMessages: any[] = [];
  username: string = '';
  showContainerEmoji: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly socketService: SocketService,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.fetchProfile().subscribe((user) => {
      this.username = user.username;
    });

    this.route.paramMap.subscribe(params => {
      this.conversationId = Number(params.get('id'));
      this.socketService.connectSocket();
      this.socketService.joinConversation(this.conversationId);
    });

    this.socketService.getMessage().subscribe((data: any) => {
      if (data.conversationId === this.conversationId) {
        this.messages.push(data);
      }

      this.messages.push(data);
    });

    this.socketService.getLoadMessages().subscribe(({ conversationId, messages }) => {
      if (conversationId === this.conversationId) {
        this.storageMessages = messages;
      }
    });

    this.socketService.getUserCount().subscribe((count: number) => {
      this.userCount = count;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.socketService.disconnectSocket();
  }

  toogleShowEmoji(): void {
    this.showContainerEmoji = !this.showContainerEmoji;
  }

  addEmoji(event: any): void {
    this.message += event.emoji.native;
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.conversationId, this.message);
      this.message = '';
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  private scrollToBottom(): void {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }
}
