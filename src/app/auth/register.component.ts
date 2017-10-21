import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications/dist';

@Component({
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    Username: ['', Validators.required],
    Email: ['', Validators.required],
    Password: ['', Validators.required],
    Captcha: ['', Validators.required]
  });

  registerSuccess: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService) {
    if (authService.isLoggedIn) {
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit(): void {
    this.registerSuccess = true;
  }

  onCaptchaResolved(response: string) {
    this.registerForm.controls['Captcha'].setValue(response);
  }
}
