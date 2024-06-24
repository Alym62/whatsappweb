import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { ConversationService } from 'src/app/core/services/conversation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  usernameStr: UserModel[] = [];

  constructor(
    private readonly conversationService: ConversationService,
  ) { }

  ngOnInit(): void {
    this.conversationService.fetchAllConversation().subscribe((conversations) => {
      conversations.forEach((conversation) => {
        this.usernameStr = this.usernameStr.concat(conversation.participants);
      });

      console.log(conversations)
    });
  }

}
