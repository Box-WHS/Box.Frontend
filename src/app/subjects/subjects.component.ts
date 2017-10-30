import { Component } from '@angular/core';
import { SubjectsDataSource } from './subjects-data-source';

@Component({
  templateUrl: './subjects.component.html'
})
export class SubjectsComponent {
  dataSource: SubjectsDataSource = new SubjectsDataSource();
}
