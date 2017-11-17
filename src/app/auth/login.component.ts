import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';

@Component({
  templateUrl:  'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loginInProgress = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService) {
    if (authService.isLoggedIn()) {
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    this.loginInProgress = true;

    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).then(loggedIn => {
      this.loginInProgress = false;
      if (loggedIn) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.notificationsService.error('Passwort oder Benutzername ist falsch');
      }
    });
  }
}
