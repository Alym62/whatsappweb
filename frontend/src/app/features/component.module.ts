import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  providers: [AuthService, UserService],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule
  ],
  exports: [LoginComponent]
})
export class ComponentModule { }
