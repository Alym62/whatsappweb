import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterControl: FormControl = new FormControl();
  users!: UserModel[];
  value = '...';

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
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
}
