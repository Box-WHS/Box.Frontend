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
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService) {}

  login(): Observable<boolean> {
    if (this.cookieService.get(environment.auth.cookieName) === this.testSession) {
      console.log('Recognized session cookie');
      this.isLoggedIn = true;
      return Observable.of(true);
    }

    return Observable.of(true).do(val => {
      this.isLoggedIn = val;
      console.log('Logged in');

      this.cookieService.put(environment.auth.cookieName, this.testSession, {
        domain: environment.auth.domain,
        secure: environment.auth.forceSecureConnection,
        expires: new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * environment.auth.expirationDays))
      });
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.cookieService.remove(environment.auth.cookieName);
    this.router.navigate(['/login']);
  }
}
