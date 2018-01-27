import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class UserGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLogin(`/${route.path}`);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn() || this.authService.isSessionValid()) { return true; }

    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
