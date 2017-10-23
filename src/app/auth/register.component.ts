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
    username: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email]],
    password: ['', Validators.required],
    captcha: ['', Validators.required]
  });

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
    this.notificationsService.success('Eine E-Mail mit weiteren Anweisungen wurde abgeschickt');
    this.router.navigate(['../']);
  }

  onCaptchaResolved(response: string) {
    this.registerForm.controls.captcha.setValue(response);
  }
}
