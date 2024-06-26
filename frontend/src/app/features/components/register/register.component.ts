import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userModel: UserModel = {} as UserModel;

  constructor(
    private readonly userService: UserService,
    private _snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  private openSnackBar(): void {
    this._snackBar.open('Registro feito com sucesso! Faça login agora', '❌', {
      duration: 3000,
      panelClass: ['custom-snackbar'],
    });
  }

  register(): void {
    this.userService.register(this.userModel).subscribe(() => {
      this.openSnackBar();
      this.router.navigate(['/']);
    });
  }
}
