import { EventEmitter, Injectable, isDevMode, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Session } from './session';
import { Http, Headers } from '@angular/http';
import { StorageService } from '../storage/storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
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

  private readonly helper = new JwtHelper();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  async login(username: string, password: string): Promise<boolean> {
    // OAuth-Request to tokenserver
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=password&username=' + username + '&password=' + password + '&scope=&client_id=' + this.client + '&client_secret=' + this.clientSecret;
    try {
      const response = await this.http.post(environment.auth.authUrl + '/connect/token', body, { headers: headers }).toPromise();

      // Granted, so let's save the data
      const token = response.json().access_token;
      const tokenType = response.json().token_type;
      console.log(response.json());

      this.session = new Session(token, tokenType, this.helper.decodeToken(token));
      this.storageService.setObject(environment.auth.sessionStorageName, this.session);
      console.log(this.session);

      this.loggedIn = true;
      console.log('Logged in');

      return true;
    } catch (error) {
      console.log(error);
      this.loggedIn = false;
      return false;
    }
  }

  async register(username: string, password: string, firstName: string, lastName: string, email: string, captcha: string): Promise<boolean> {
    const url = `${environment.auth.authUrl}/register`;
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      captcha: captcha
    };

    try {
      const response = await this.http.post(url, JSON.stringify(data), { headers: this.headers }).toPromise();
      console.log(response.json());
      return response.status === 200;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  isSessionValid(): boolean {
    if (this.session && !this.helper.isTokenExpired(this.session.token)) {
      return true;
    }

    const session = this.storageService.getObject(environment.auth.sessionStorageName) as Session;
    if (session && !this.helper.isTokenExpired(session.token)) {
      this.session = session;
      this.loggedIn = true;
      console.log('Recognized session cookie');
      console.log(session);
      console.log('Session will expire at ' + this.helper.getTokenExpirationDate(session.token).toLocaleString())

      return true;
    }
    return false;
  }

  logout(): void {
    this.router.navigate(['/login']);

    this.loggedIn = false;
    this.storageService.remove(environment.auth.sessionStorageName);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || this.sessionValid;
  }
}
