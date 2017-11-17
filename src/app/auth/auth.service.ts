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
  headers: Headers = new Headers();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private http: Http) {
    this.checkSession();
    this.headers.append('Content-Type', 'application/json');
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

      // Granted, so let's save the data
      token = response.json().access_token;
      tokenType = response.json().token_type;
      expiration = response.json().expires_in;
      console.log(response.json());

      this.loggedIn = true;
      console.log('Logged in');

      this.session = new Session(username, token, tokenType, expiration);
      this.storageService.setObject('box-session', this.session);

      return true;
    } catch (error) {
      console.log(error);
      this.loggedIn = false;
      return false;
    }
  }

  async register(username: string, password: string, firstName: string, lastName: string, email: string): Promise<boolean> {
    const url = `${this.authServer}/register`;
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    try {
      const response = await this.http.post(url, JSON.stringify(data), { headers: this.headers }).toPromise();
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
    return false;
  }

  logout(): void {
    this.loggedIn = false;

    this.storageService.remove('box-session');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || this.sessionValid; // || isDevMode();
  }
}
