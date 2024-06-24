import { Component } from '@angular/core';
import { RegisterModel } from 'src/app/core/models/register.model';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userModel: RegisterModel = {} as RegisterModel;

  constructor(
    private readonly registerService: RegisterService,
  ) { }

  register(): void {
    this.registerService.register(this.userModel).subscribe(() => console.log('registro feito com sucesso, credenciais:', this.userModel));
  }
}
