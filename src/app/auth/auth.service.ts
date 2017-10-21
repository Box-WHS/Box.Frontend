import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  redirectUrl = '/';
  isLoggedIn: boolean;

  login(): Observable<boolean> {
    return Observable.of(true).do(val => {
      this.isLoggedIn = val;
      console.log('Logged in');
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
