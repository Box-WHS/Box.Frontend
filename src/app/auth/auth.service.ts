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

  @Output() onLogout = new EventEmitter();

  redirectUrl = '/';
  sessionValid = false;
  loggedIn = false;

  session: Session;
  headers: Headers = new Headers();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private http: Http) {
    this.isSessionValid();
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

      const helper = new JwtHelper();
      const decodedToken = helper.decodeToken(token);

      this.session = new Session(token, tokenType, decodedToken, helper.getTokenExpirationDate(token));
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
    const helper = new JwtHelper();
    if (this.session && !helper.isTokenExpired(this.session.token)) {
      return true;
    }

    const session = this.storageService.getObject(environment.auth.sessionStorageName) as Session;
    if (session && !helper.isTokenExpired(session.token)) {
      console.log('Recognized session cookie');
      this.session = session;
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;

    this.storageService.remove(environment.auth.sessionStorageName);
    this.onLogout.emit();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || this.sessionValid; // || isDevMode();
  }
}
