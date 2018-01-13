import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { WindowRef } from './window-ref';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-root',
  providers: [Location],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static pageTitle: string;

  notificationOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  sidenavOpened = false;

  constructor(
    public authService: AuthService,
    public windowRef: WindowRef,
    public router: Router,
    private location: Location) {
  }

  get pageTitle() {
    return AppComponent.pageTitle;
  }

  public navigateBack(): void {
    this.location.back();
  }
}
