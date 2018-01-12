import { Component, Host } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  selector: 'app-sidebar'
})

export class SidenavComponent {
  entries = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      routerLink: ['/dashboard']
    },
    {
      title: 'Fächer',
      icon: 'folder_open',
      routerLink: ['/subjects']
    },
    {
      title: 'Logout',
      icon: 'exit_to_app',
      routerLink: ['/logout']
    }
  ];

  constructor(
    private router: Router,
    @Host() private parent: AppComponent,
    public authService: AuthService) {
  }

  public navigate(link: string[]) {
    console.log(this.router.url);
    this.router.navigate(link);
    this.parent.sidenavOpened = false;
  }
}
