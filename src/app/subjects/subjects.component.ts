import { Component, OnInit } from '@angular/core';
import { SubjectsDataSource } from './subjects-data-source';
import { Subject } from './subject';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSort } from '@angular/material';
import { SubjectsService } from './subjects.service';
import { SubjectCreateComponent } from './subject-create.component';

@Component({
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  displayedColumns = [ 'subject', 'learnProgress' ];
  dataSource: SubjectsDataSource | null;

  constructor(private router: Router, private route: ActivatedRoute, private subjectsService: SubjectsService, private dialog: MatDialog) {
    AppComponent.pageTitle = 'Fächer';
  }

  ngOnInit(): void {
    this.dataSource = new SubjectsDataSource(this.subjectsService);
  }

  onRowClick(subject: Subject) {
    this.router.navigate([`${subject.id}`],  {relativeTo: this.route});
  }

  public addSubject(): void {
    const dialogRef = this.dialog.open(SubjectCreateComponent, {
      width: '35rem',
      height: '15rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectsService.createSubject(result).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigate([`${data.id}`, 'edit'],  {relativeTo: this.route});
          }
        });
      }
    });
  }
}
