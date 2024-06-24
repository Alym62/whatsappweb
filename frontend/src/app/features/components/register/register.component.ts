import { Component } from '@angular/core';
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
  ) { }

  register(): void {
    this.userService.register(this.userModel).subscribe(() => console.log('registro feito com sucesso, credenciais:', this.userModel));
  }
}
