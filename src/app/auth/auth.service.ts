import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  readonly testSession = 'myAwesomeSessionKeyIsSoAwesome';

  redirectUrl = '/';
  sessionValid = false;
  loggedIn = false;

  constructor(
    private router: Router,
    private cookieService: CookieService) {
    this.checkSession();
  }

  login(): Observable<boolean> {
    return Observable.of(true).do(val => {
      this.loggedIn = val;
      console.log('Logged in');

      this.cookieService.put(environment.auth.cookieName, this.testSession, {
        domain: environment.auth.domain,
        secure: environment.auth.forceSecureConnection,
        expires: new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * environment.auth.expirationDays))
      });
    });
  }

  checkSession(): boolean {
    if (this.cookieService.get(environment.auth.cookieName) === this.testSession) {
      console.log('Recognized session cookie');
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.cookieService.remove(environment.auth.cookieName);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || this.sessionValid;
  }
}
