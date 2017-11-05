import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { WindowRef } from './window-ref';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { StorageService } from './storage/storage.service';

@Component({
  selector: 'app-root',
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
    public windowRef: WindowRef) {
  }

  get pageTitle() {
    return AppComponent.pageTitle;
  }
}
