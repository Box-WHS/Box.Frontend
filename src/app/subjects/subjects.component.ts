import { Component, OnInit } from '@angular/core';
import { SubjectsDataSource } from './subjects-data-source';
import { Subject } from './subject';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  displayedColumns = [ 'subject', 'learnProgress' ];
  dataSource: SubjectsDataSource | null;

  constructor(private router: Router, private route: ActivatedRoute) {
    AppComponent.pageTitle = 'Fächer';
  }

  ngOnInit(): void {
    this.dataSource = new SubjectsDataSource();
  }

  onRowClick(subject: Subject) {
    this.router.navigate([`${subject.id}`],  {relativeTo: this.route});
  }
}
