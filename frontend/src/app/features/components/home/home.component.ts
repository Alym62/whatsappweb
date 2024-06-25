import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterControl: FormControl = new FormControl();
  users!: UserModel[];
  profile!: UserModel;

  constructor(
    private readonly userService: UserService,
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
