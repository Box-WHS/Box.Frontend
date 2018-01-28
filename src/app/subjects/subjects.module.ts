import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SubjectsComponent } from './subjects.component';
import { SubjectDetailComponent } from './subject-detail.component';
import { SubjectLearnComponent } from './subject-learn.component';
import { CommonModule } from '@angular/common';
import { SubjectEditComponent } from './subject-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectsService } from './subjects.service';
import { SubjectCreateComponent } from './subject-create.component';
import { CardCreateComponent } from './card-create.component';
import { SubjectsResolver } from './subjects.resolver';

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectDetailComponent,
    SubjectLearnComponent,
    SubjectEditComponent,
    SubjectCreateComponent,
    CardCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SubjectsComponent
      },
      {
        path: ':id',
        component: SubjectDetailComponent,
        resolve: { data: SubjectsResolver }
      },
      {
        path: ':id/learn',
        component: SubjectLearnComponent,
        resolve: { data: SubjectsResolver }
      },
      {
        path: ':id/edit',
        component: SubjectEditComponent,
        resolve: { data: SubjectsResolver }
      }
    ])
  ],
  entryComponents: [
    SubjectCreateComponent,
    CardCreateComponent
  ],
  providers: [
    SubjectsService,
    SubjectsResolver
  ]
})
export class SubjectsModule {}
