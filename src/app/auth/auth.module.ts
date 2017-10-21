import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { PasswordResetComponent } from './password-reset.component';
import { CaptchaComponent } from './captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserGuard } from './user.guard';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    CaptchaComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RecaptchaModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'reset',
        component: PasswordResetComponent
      }
    ])
  ],
  providers: [
  ]
})
export class AuthModule {}
