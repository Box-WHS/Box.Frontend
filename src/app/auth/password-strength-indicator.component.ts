import { Component, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Http } from '@angular/http';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  template: `<mat-progress-bar mode="determinate" style="width: 100%" [value]="strength"></mat-progress-bar>`,
  selector: 'app-password-strength-indicator'
})
export class PasswordStrengthIndicatorComponent {
  @Input()
  set password(password: string) {
    if (this.currentPassword === password) {
      return;
    }

    this.currentPassword = password;
    this.calculateStrength(password);
  }

  @Input() minLength = 0;
  @Output() strengthCalculated = new EventEmitter<number>();
  currentPassword: string;
  strength = 0;
  simplePasswords: string[];

  constructor(private http: Http) {
    this.getSimplePasswords();
  }

  calculateStrength(password: string): void {
    this.strength = 0;

    if (!password || password.length < this.minLength || (this.simplePasswords && this.simplePasswords.indexOf(password) > -1)) {
      this.strengthCalculated.emit(this.strength);
      return;
    }

    this.strength += password.length * 3;

    if (/[a-z]+/.test(password)) {
      this.strength += 10;
    }

    if (/[A-Z]+/.test(password)) {
      this.strength += 10;
    }

    if (/[0-9]+/.test(password)) {
      this.strength += 10;
    }

    if (/[$@&+#-/:-?{-~!"^_`\[\]]/g.test(password)) {
      this.strength += 20;
    }

    this.strengthCalculated.emit(this.strength);
  }

  getSimplePasswords(): void {
    this.simplePasswords = [];
    try {
      this.http.get('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/10_million_password_list_top_1000.txt').subscribe(data => {
        this.simplePasswords = data.text().split('\n');
      });
    } catch (error) {
      console.log(error);
    }
  }
}
