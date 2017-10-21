import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';

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
    Username: ['', Validators.required]
  });

  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  onSubmit(): void {
    this.notificationsService.success('Eine E-Mail mit weiteren Anweisungen wurde abgeschickt');
    this.router.navigate(['/login']);
  }

  onCaptchaResolved(): void {
    this.captchaResolved = true;
  }

  onInputChange(): void {
    this.isEmail = (this.resetForm.controls[ 'Username' ].value as string).indexOf('@') > -1;
    this.inputType = this.isEmail ? 'email' : 'search';
    this.placeholder = this.isEmail ? 'E-Mail' : 'Nutzername';
    console.log(this.inputType);
  }
}
