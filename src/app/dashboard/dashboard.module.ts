import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      }
    ])
  ]
})
export class DashboardModule {}
