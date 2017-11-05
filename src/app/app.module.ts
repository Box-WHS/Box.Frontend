import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserXhr, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressBrowserXhr, NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthService } from './auth/auth.service';
import { UserGuard } from './auth/user.guard';
import { NotificationsService } from 'angular2-notifications/dist';
import { CookieModule } from 'ngx-cookie';
import { WindowRef } from './window-ref';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LogoutComponent } from './auth/logout.component';
import { StorageModule } from './storage/storage.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    StorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgProgressModule,
    SimpleNotificationsModule.forRoot(),
    CookieModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
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
  providers: [
    NotificationsService,
    AuthService,
    WindowRef,
    UserGuard,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
