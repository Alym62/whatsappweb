import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationModel } from 'src/app/core/models/conversation.model';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConversationService } from 'src/app/core/services/conversation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  usernameStr: UserModel[] = [];
  conversations: ConversationModel[] = [];

  @Output() conversationSelected = new EventEmitter<number>();

  constructor(
    private readonly authService: AuthService,
    private readonly conversationService: ConversationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.conversationService.fetchAllConversation().subscribe((conversations) => {
      this.conversations = conversations;
      conversations.forEach((conversation) => {
        this.usernameStr = this.usernameStr.concat(conversation.participants);
      });
    });
  }

  onConversationClick(conversationId: number): void {
    this.router.navigate(['/chat', conversationId]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
