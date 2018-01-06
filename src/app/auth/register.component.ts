import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications/dist';
import { environment } from '../../environments/environment';
import { CustomValidators } from 'ng2-validation';
import { email } from 'ng2-validation/dist/email';

@Component({
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent {

  dataForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  private email = new FormControl('', [Validators.required, Validators.email]);
  private emailConfirm = new FormControl('', CustomValidators.equalTo(this.email));
  emailForm = this.formBuilder.group({
    email: this.email,
    emailConfirm: this.emailConfirm
  });

  private password = new FormControl('', Validators.minLength(environment.auth.minPasswordLength));
  private passwordConfirm = new FormControl('', CustomValidators.equalTo(this.password));
  passwordForm = this.formBuilder.group({
    password: this.password,
    passwordConfirm: this.passwordConfirm
  });
  passwordWeak = true;
  minPasswordLength = environment.auth.minPasswordLength;

  captchaKey: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    ) {
    if (authService.isLoggedIn()) {
      console.log('Is logged in');
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  register(): void {
    console.log(this.passwordForm.errors);
    if (this.passwordForm.errors) {
      return;
    }

    this.authService.register(
      this.dataForm.controls.username.value,
      this.passwordForm.controls.password.value,
      this.dataForm.controls.firstName.value,
      this.dataForm.controls.lastName.value,
      this.emailForm.controls.email.value,
      this.captchaKey).catch(error => {
        this.notificationsService.error('Es ist ein unbekannter Fehler aufgetreten. Versuche es später noch einmal.');
      });
  }

  onCaptchaResolved(response: string): void {
    this.captchaKey = response;
  }

  onPasswordStrengthCalculated(strength: number): void {
    this.passwordWeak = strength < 40;
    this.cdr.detectChanges();
  }
}
