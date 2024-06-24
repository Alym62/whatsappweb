import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials } from 'src/app/core/models/credentials.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: Credentials = {} as Credentials;

  constructor(
    private readonly authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  private openSnackBar(): void {
    this._snackBar.open('Login feito com sucesso!', '❌', {
      duration: 3000,
      panelClass: ['custom-snackbar'],
    });
  }

  login(): void {
    this.authService.login(this.credentials).subscribe(() => {
      this.openSnackBar();
    });
  }
}
