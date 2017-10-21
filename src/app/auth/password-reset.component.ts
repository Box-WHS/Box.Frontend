import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  isEmail: boolean;
  inputType = 'search';
  captchaResolved: boolean;
  placeholder = 'Nutzername';
  resetForm = this.formBuilder.group({
    Username: ['', Validators.required],
    Captcha: ['', Validators.required]
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

  onSubmit(): void {
    this.notificationsService.success('Eine E-Mail mit weiteren Anweisungen wurde abgeschickt');
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCaptchaResolved(response: string): void {
    this.resetForm.controls['Captcha'].setValue(response);
  }

  onInputChange(): void {
    this.isEmail = (this.resetForm.controls[ 'Username' ].value as string).indexOf('@') > -1;
    this.inputType = this.isEmail ? 'email' : 'search';
    this.placeholder = this.isEmail ? 'E-Mail' : 'Nutzername';
  }
}
