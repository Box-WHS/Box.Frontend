import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset.component';
import { CaptchaComponent } from './captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegisterComponent } from './register.component';
import { CookieModule } from 'ngx-cookie';

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
    CookieModule.forChild(),
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
      },
      {
        path: 'reset/:key',
        component: PasswordResetComponent
      }
    ])
  ],
  providers: [
  ]
})
export class AuthModule {}
