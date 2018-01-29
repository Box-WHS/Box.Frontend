import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SimpleSnackBar } from '@angular/material/snack-bar/typings/simple-snack-bar';

@Component({
  templateUrl:  'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loginInProgress = false;
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private notificationsService: NotificationsService,
    private authService: AuthService) {
    if (authService.isLoggedIn()) {
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['loggedOut']) {
      this.snackBarRef = this.snackBar.open('Du hast dich erfolgreich ausgeloggt', '', {duration: 4000});
    } else if (this.route.snapshot.queryParams['sessionExpired']) {
      this.snackBarRef = this.snackBar.open('Deine Sitzung ist abgelaufen, bitte logg dich erneut ein', '', {duration: 4000});
    }
  }

  ngOnDestroy(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
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
