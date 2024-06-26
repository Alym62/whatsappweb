import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;

  filterControl: FormControl = new FormControl();
  users!: UserModel[];
  profile!: UserModel;

  constructor(
    private readonly userService: UserService,
    private readonly socketService: SocketService,
    private readonly router: Router,
    public dialog: MatDialog,
  ) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalComponent, {
      data: this.profile,
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openConversation(username: string): void {
    const selectedUser = this.users.find(user => user.username === username);
    if (selectedUser) {
      const participantsId = [this.profile.id, selectedUser.id];

      this.socketService.openConversation(participantsId);
      this.socketService.getConversationOpened().subscribe((conversation) => {
        this.router.navigate(['/chat', conversation.id]);
      });
    }
  }

  ngOnInit(): void {
    this.fetchProfile();
    this.fetchFilterUsername();
  }

  private fetchFilterUsername(): void {
    this.filterControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => {
        if (value.trim().length >= 3) return this.userService.fetchFilter(value.trim());
        else return [];
      }),
    ).subscribe((users) => {
      this.users = users;
    });
  }

  private fetchProfile(): void {
    this.userService.fetchProfile().subscribe((user) => {
      this.profile = user;
    });
  }
}
