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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgProgressModule,
    RouterModule.forRoot([
      {
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ])
  ],
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
