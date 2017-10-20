import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl:  'login.component.html'
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {

  }
}
