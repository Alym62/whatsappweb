import { Component } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userModel: UserModel = {} as UserModel;

  constructor(
    private readonly registerService: RegisterService,
  ) { }

  register(): void {
    this.registerService.register(this.userModel).subscribe(() => console.log('registro feito com sucesso, credenciais:', this.userModel));
  }
}
