import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  templateUrl:  'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    if (authService.isLoggedIn) {
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    this.authService.login().subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate([this.authService.redirectUrl]);
      }
    });
  }
}
