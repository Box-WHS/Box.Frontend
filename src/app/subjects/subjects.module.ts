import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SubjectsComponent } from './subjects.component';

@NgModule({
  declarations: [
    SubjectsComponent
  ],
  imports: [
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SubjectsComponent,
        data: {
          title: 'Fächer'
        }
      }
    ])
  ]
})
export class SubjectsModule {}
