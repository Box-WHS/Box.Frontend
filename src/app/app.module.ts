import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthService } from './auth/auth.service';
import { UserGuard } from './auth/user.guard';
import { NotificationsService } from 'angular2-notifications/dist';
import { WindowRef } from './window-ref';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LogoutComponent } from './auth/logout.component';
import { StorageModule } from './storage/storage.module';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ConfirmDialogComponent } from './misc/confirm-dialog.component';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

export function authHttpServiceFactory(http: Http, options: RequestOptions, authService: AuthService) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => authService.session.token),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LogoutComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule,
    StorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canLoad: [ UserGuard ]
      },
      {
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canLoad: [ UserGuard ]
      },
      {
        path: 'subjects',
        loadChildren: './subjects/subjects.module#SubjectsModule',
        canLoad: [ UserGuard ]
      }
    ])
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    NotificationsService,
    AuthService,
    WindowRef,
    UserGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
