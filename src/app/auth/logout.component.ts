import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  template: ' '
})

export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.logout();
  }
}
