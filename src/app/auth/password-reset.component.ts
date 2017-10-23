import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  isEmail: boolean;
  inputType = 'search';
  isPasswordResetRequest = true;

  placeholder = 'Nutzername';
  requestResetForm = this.formBuilder.group({
    username: ['', Validators.required],
    captcha: ['', Validators.required]
  });

  resetForm = this.formBuilder.group({
    key: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    passwordConfirm: ['', [Validators.required]]
  });

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    if (authService.isLoggedIn) {
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.resetForm.controls.key.setValue(params['key']);
        this.isPasswordResetRequest = false;
      }
    });
  }

  onSubmitRequest(): void {
    this.notificationsService.success('Eine E-Mail mit weiteren Anweisungen wurde abgeschickt');
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmitReset(): void {
    this.notificationsService.success('Dein Passwort wurde zurückgesetzt');
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onCaptchaResolved(response: string): void {
    this.requestResetForm.controls.captcha.setValue(response);
  }

  onInputChange(): void {
    this.isEmail = (this.requestResetForm.controls.username.value as string).indexOf('@') > -1;
    this.inputType = this.isEmail ? 'email' : 'search';
    this.placeholder = this.isEmail ? 'E-Mail' : 'Nutzername';
  }
}
