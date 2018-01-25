import {
  Component, OnInit,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject';
import { Tray } from './tray';
import { Observable } from 'rxjs/Observable';
import { Card } from './card';
import { SubjectCreateComponent } from './subject-create.component';
import { MatDialog } from '@angular/material';
import { CardCreateComponent } from './card-create.component';

@Component({
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  subject: Observable<Subject>;
  trays: Tray[];
  subjectName = '';

  constructor(private route: ActivatedRoute, private subjectsService: SubjectsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.subject = this.subjectsService.getSubject(id);
      this.updateData(this.subject);
      this.subject.subscribe(data => this.subjectsService.getTrays(data).subscribe(trays => this.trays = trays));
    });
  }

  public changeSubjectName(): void {
    this.subject.subscribe(subject => {
      this.subject = this.subjectsService.editSubject(subject.id, this.subjectName);
      this.updateData(this.subject);
    });
  }

  private updateData(subject: Observable<Subject>): void {
    subject.subscribe(data => {
      this.subjectName = data.name;
      AppComponent.pageTitle = `Fach ${data.name} bearbeiten`;
    });
  }

  public createCard(): void {
    const dialogRef = this.dialog.open(CardCreateComponent, {
      width: '50rem',
      height: '19rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  public editCard(card: Card): void {
    card.isEditingActivated = true;
  }

  public saveCard(card: Card): void {
    card.isEditingActivated = false;
    this.subjectsService.editCard(card);
  }
}
