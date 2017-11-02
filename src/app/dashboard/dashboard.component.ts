import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  constructor(private authService: AuthService) {
    AppComponent.pageTitle = 'Dashboard';
  }

  onLogout() {
    this.authService.logout();
  }
}
