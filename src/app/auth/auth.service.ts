import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../environments/environment';
import { Session } from './session';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
  readonly loginSession = 'auth:sessionInfo';

  // OAuth-settings
  public get authServer(){
    return 'http://localhost:4711';
  }
  public get tokenURL(){
    return this.authServer + '/connect/token';
  }
  public get client(){
    return 'box';
  }
  public get clientSecret(){
    return 'secret';
  }

  redirectUrl = '/';
  sessionValid = false;
  loggedIn = false;

  session: Session;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: Http) {
    this.checkSession();
  }

  login(username: string, password: string): Observable<boolean> {
    return Observable.create(observer => {
      // OAuth-Request to tokenserver
      const headers = new Headers();
      let token: string;
      let tokenType: string;
      let expiration: number;
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      const body = 'grant_type=password&username=' + username + '&password=' + password + '&scope=&client_id=' + this.client + '&client_secret=' + this.clientSecret;
      this.http.post(this.tokenURL, body, { headers: headers })
        .toPromise()
        .then(response => {
          // Granted, so let's save the data! => TODO:move to localStorage later!
          token = response.json().access_token;
          tokenType = response.json().token_type;
          expiration = response.json().expires_in;

          sessionStorage.setItem('access_token', token);
          sessionStorage.setItem('token_type', tokenType);
          sessionStorage.setItem('expires_in', expiration.toString());

          this.loggedIn = true;
          console.log('Logged in');

          this.session = new Session(username, this.loginSession);                    // TODO: get username from id-server endpoint

          this.cookieService.putObject(environment.auth.cookieName, this.session, {
            domain: environment.auth.domain,
            secure: environment.auth.forceSecureConnection,
            expires: new Date(Date.now() + expiration)
          });

          observer.next(true);
          observer.complete();
        })
        .catch(error => {
          this.loggedIn = false;
          console.log(error);

          observer.next(false);
          observer.complete();
        });
    });
  }

  checkSession(): boolean {
    const session = this.cookieService.getObject(environment.auth.cookieName) as Session;
    if (session && session.sessionKey === this.loginSession) {
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

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('expires_in');
    sessionStorage.removeItem('token_type');

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || this.sessionValid || isDevMode();
  }
}
