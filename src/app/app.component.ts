import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { WindowRef } from './window-ref';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notificationOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  pageTitle: string;
  sidenavOpened = false;

  constructor(
    public authService: AuthService,
    public windowRef: WindowRef,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.cdr.detectChanges();
        this.pageTitle = event['title'];
        }
      );
  }
}
