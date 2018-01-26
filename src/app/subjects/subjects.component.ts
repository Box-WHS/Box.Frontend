import { Component, OnInit } from '@angular/core';
import { SubjectsDataSource } from './subjects-data-source';
import { Subject } from './subject';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSort } from '@angular/material';
import { SubjectsService } from './subjects.service';
import { SubjectCreateComponent } from './subject-create.component';
import { async } from 'rxjs/scheduler/async';

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

  public async addSubject(): Promise<void> {
    const dialogRef = this.dialog.open(SubjectCreateComponent/*, {
      width: '35rem',
      height: '15rem'
    }*/);

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const subject = await this.subjectsService.createSubject(result).toPromise();
      console.log(subject);
      for (let i = 1; i <= 5; i++) {
        const tray = await this.subjectsService.createTray(subject, `Fach ${i}`, '00:00:00').toPromise();
        console.log(tray);
      }
      this.subjectsService.createTray(subject, 'Gelernt', '00:00:00').subscribe(tray => console.log(tray));

      if (subject) {
        this.router.navigate([`${subject.id}`, 'edit'],  {relativeTo: this.route});
      }
    }
    /*
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectsService.createSubject(result).subscribe(data => {
          for (let i = 1; i <= 5; i++) {
            this.subjectsService.createTray(data, `Fach ${i}`, '00:00:00').subscribe(tray => console.log(tray));
          }
          this.subjectsService.createTray(data, 'Gelernt', '00:00:00').subscribe(tray => console.log(tray));

          console.log(data);
          if (data) {
            this.router.navigate([`${data.id}`, 'edit'],  {relativeTo: this.route});
          }
        });
      }
    });*/
  }
}
