import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications/dist';
import { environment } from '../../environments/environment';

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

  emailForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email]],
    emailConfirm: ''
  });

  passwordForm = this.formBuilder.group({
    password: ['', Validators.minLength(environment.auth.minPasswordLength)],
    passwordConfirm: ''
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

    this.emailForm.controls.email.valueChanges.subscribe(() => {
      this.checkMatchingEmail();
    });
    this.emailForm.controls.emailConfirm.valueChanges.subscribe(() => {
      this.checkMatchingEmail();
    });

    this.passwordForm.controls.password.valueChanges.subscribe(() => {
      this.checkMatchingPassword();
    });
    this.passwordForm.controls.passwordConfirm.valueChanges.subscribe(() => {
      this.checkMatchingPassword();
    });
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
      this.captchaKey)
      .then(response => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.notificationsService.error('Es ist ein unbekannter Fehler aufgetreten. Versuche es später noch einmal.');
      });
  }

  checkMatchingEmail(): void {
    if (this.emailForm.controls.email.errors)  {
      return;
    }

    const matching = this.emailForm.controls.email.value === this.emailForm.controls.emailConfirm.value;
    if (!matching) {
      this.emailForm.controls.emailConfirm.setErrors({'emailNotMatching': !matching});
    } else {
      this.emailForm.controls.emailConfirm.setErrors(null);
    }
  }

  checkMatchingPassword(): void {
    if (this.passwordForm.controls.password.errors || this.passwordWeak)  {
      return;
    }

    const matching = this.passwordForm.controls.password.value === this.passwordForm.controls.passwordConfirm.value;
    this.passwordForm.controls.passwordConfirm.setErrors({'passwordNotMatching': !matching ? true : null});
  }

  onCaptchaResolved(response: string): void {
    this.captchaKey = response;
  }

  onPasswordStrengthCalculated(strength: number): void {
    this.passwordWeak = strength < 40;
    this.cdr.detectChanges();
  }
}
