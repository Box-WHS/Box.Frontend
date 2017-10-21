import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
      }
    ])
  ]
})
export class DashboardModule {}
