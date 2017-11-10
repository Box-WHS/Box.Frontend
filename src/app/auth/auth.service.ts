import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Session } from './session';
import { Http, Headers } from '@angular/http';
import { StorageService } from '../storage/storage.service';

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
    private storageService: StorageService,
    private http: Http) {
    this.checkSession();
  }

  async login(username: string, password: string): Promise<boolean> {
    // OAuth-Request to tokenserver
    const headers = new Headers();
    let token: string;
    let tokenType: string;
    let expiration: number;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=password&username=' + username + '&password=' + password + '&scope=&client_id=' + this.client + '&client_secret=' + this.clientSecret;
    try {
      const response = await this.http.post(this.tokenURL, body, { headers: headers }).toPromise();

      // Granted, so let's save the data! => TODO:move to localStorage later!
      token = response.json().access_token;
      tokenType = response.json().token_type;
      expiration = response.json().expires_in;

      this.loggedIn = true;
      console.log('Logged in');

      this.session = new Session(token, tokenType, expiration);                    // TODO: get username from id-server endpoint
      this.storageService.setObject('box-session', this.session);

      return true;
    } catch (error) {
      console.log(error);
      this.loggedIn = false;
      return false;
    }
  }

  async register(formGroup: any): Promise<boolean> {
    const url = `${this.authServer}/register`;
    const data = {
      username: formGroup.controls.username.value,
      password: formGroup.controls.password.value,
      firstName: formGroup.controls.firstName.value,
      lastName: formGroup.controls.lastName.value,
      email: formGroup.controls.email.value,
      captcha: formGroup.controls.captcha.value
    };

    try {
      const response = await this.http.post(url, JSON.stringify(data)).toPromise();
      return response.status === 200;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  checkSession(): boolean {
    /*const session = this.cookieService.getObject(environment.auth.cookieName) as Session;
    if (session && session.sessionKey === this.loginSession) {
      console.log('Recognized session cookie');
      this.session = session;
      this.loggedIn = true;
      return true;
    }*/
    return true;
  }

  logout(): void {
    this.loggedIn = false;

    this.storageService.remove('box-session');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || this.sessionValid || isDevMode();
  }
}
