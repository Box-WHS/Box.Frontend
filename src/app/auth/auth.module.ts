import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { PasswordResetComponent } from './password-reset.component';
import { CaptchaComponent } from './captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    CaptchaComponent
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
        path: 'reset',
        component: PasswordResetComponent
      }
    ])
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
