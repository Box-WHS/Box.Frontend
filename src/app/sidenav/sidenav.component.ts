import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './sidenav.component.html',
  selector: 'app-sidebar'
})

export class SidenavComponent {
  entries = [
    {
      title: 'Dashboard',
      routerLink: ['/']
    },
    {
      title: 'Example',
      routerLink: ['/test']
    }
  ];

  constructor(private router: Router, public authService: AuthService) {}

  public navigate(link: string[]) {
    this.router.navigate(link);
  }
}
