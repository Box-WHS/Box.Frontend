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

  dataForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  emailForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email]],
    emailConfirm: ''
  });
  emailMatching = true;

  passwordForm = this.formBuilder.group({
    password: ['', Validators.required],
    passwordConfirm: ''
  });
  passwordMatching = true;

  /*
  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email]],
    emailConfirm: ['', [ Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    captcha: ['', Validators.required]
  });*/

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService) {
    if (authService.isLoggedIn()) {
      console.log('Is logged in');
      this.router.navigate([this.authService.redirectUrl]);
    }

    this.emailForm.controls.email.valueChanges.subscribe(() => {
      this.checkMatchingEmail();
    });
    this.emailForm.controls.emailConfirm.valueChanges.subscribe(() => {
      this.checkMatchingEmail();
    })

    this.passwordForm.controls.password.valueChanges.subscribe(() => {
      this.checkMatchingPassword();
    });
    this.passwordForm.controls.passwordConfirm.valueChanges.subscribe(() => {
      this.checkMatchingPassword();
    });
  }

  register(): void {
    this.authService.register(
      this.dataForm.controls.username.value,
      this.passwordForm.controls.password.value,
      this.dataForm.controls.firstName.value,
      this.dataForm.controls.lastName.value,
      this.emailForm.controls.email.value);
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
    if (this.passwordForm.controls.password.errors)  {
      return;
    }

    const matching = this.passwordForm.controls.password.value === this.passwordForm.controls.passwordConfirm.value;
    if (!matching) {
      this.passwordForm.controls.passwordConfirm.setErrors({'passwordNotMatching': !matching});
    } else {
      this.passwordForm.controls.passwordConfirm.setErrors(null);
    }
  }

  /*
  onSubmit(): void {
    // this.notificationsService.success('Eine E-Mail mit weiteren Anweisungen wurde abgeschickt');
    this.router.navigate(['../']);
    // this.authService.register(this.registerForm);
  }
  */

  /*
  onCaptchaResolved(response: string) {
    this.registerForm.controls.captcha.setValue(response);
  }
  */
}
