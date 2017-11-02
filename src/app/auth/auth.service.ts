import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Session } from './session';

@Injectable()
export class AuthService {
  readonly testSession = 'myAwesomeSessionKeyIsSoAwesome';

  redirectUrl = '/';
  sessionValid = false;
  loggedIn = false;

  session: Session = new Session('Username', this.testSession);

  constructor(
    private router: Router,
    private cookieService: CookieService) {
    this.checkSession();
  }

  login(username: string, password: string): Observable<boolean> {
    return Observable.of(true).do(val => {
      this.loggedIn = val;
      console.log('Logged in');

      this.session = new Session(username, this.testSession);

      this.cookieService.putObject(environment.auth.cookieName, this.session, {
        domain: environment.auth.domain,
        secure: environment.auth.forceSecureConnection,
        expires: new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * environment.auth.expirationDays))
      });
    });
  }

  checkSession(): boolean {
    const session = this.cookieService.getObject(environment.auth.cookieName) as Session;
    if (session && session.sessionKey === this.testSession) {
      console.log('Recognized session cookie');
      this.session = session;
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
    return this.loggedIn || this.sessionValid || isDevMode();
  }
}
