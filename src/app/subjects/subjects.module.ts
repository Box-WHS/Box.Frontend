import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SubjectsComponent } from './subjects.component';
import { SubjectDetailComponent } from './subject-detail.component';
import { SubjectLearnComponent } from './subject-learn.component';
import { CommonModule } from '@angular/common';
import { SubjectEditComponent } from './subject-edit.component';

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectDetailComponent,
    SubjectLearnComponent,
    SubjectEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SubjectsComponent
      },
      {
        path: ':id',
        component: SubjectDetailComponent
      },
      {
        path: ':id/learn',
        component: SubjectLearnComponent
      },
      {
        path: ':id/edit',
        component: SubjectEditComponent
      }
    ])
  ]
})
export class SubjectsModule {}
