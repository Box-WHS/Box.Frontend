import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject';
import { Tray } from './tray';
import { Card } from './card';
import { MatDialog } from '@angular/material';
import { CardCreateComponent } from './card-create.component';
import { ConfirmDialogComponent } from '../misc/confirm-dialog.component';

@Component({
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  subject: Subject;
  subjectName = '';

  constructor(private route: ActivatedRoute, private router: Router, private subjectsService: SubjectsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subject = this.route.snapshot.data.data as Subject;
    this.subjectName = this.subject.name;
    this.updateData();
  }

  public changeSubjectName(): void {
    this.subject.name = this.subjectName;
    this.subjectsService.editSubject(this.subject.id, this.subjectName).subscribe();
    this.updateData();
  }

  private updateData(): void {
    AppComponent.pageTitle = `Fach ${this.subject.name} bearbeiten`;
  }

  public createCard(): void {
    const dialogRef = this.dialog.open(CardCreateComponent, {
      width: '50rem',
      height: '19rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectsService.createCard(this.subject.trays[0], result.question, result.answer).subscribe(card => {
          if (card) {
            this.subject.trays[0].cards.push(card);
          }
        });
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

  public resetTray(tray: Tray): void {
    ConfirmDialogComponent.open(
      this.dialog,
      'Bist du dir sicher?',
      `Dies setzt den Lernfortschritt aller Karten in ${tray.name} zurück.`,
      'Abbrechen',
      'Zurücksetzen').subscribe(result => {
        this.subject.trays[0].cards = this.subject.trays[0].cards.concat(tray.cards);
        tray.cards = [];
        // TODO: api call
    });
  }

  public resetAll(): void {
    ConfirmDialogComponent.open(
      this.dialog,
      'Bist du dir sicher?',
      `Dies setzt den Lernfortschritt aller Karten zurück.`,
      'Abbrechen',
      'Alle zurücksetzen', true).subscribe(result => {
        for (let i = 1; i < this.subject.trays.length; i++) {
          this.subject.trays[0].cards = this.subject.trays[0].cards.concat(this.subject.trays[i].cards);
          this.subject.trays[i].cards = [];
        }
        // TODO: api call
    });
  }

  public deleteCard(tray: Tray, card: Card): void {
    const index = tray.cards.indexOf(card);
    if (index > -1) {
      tray.cards.splice(index, 1);
    }

    this.subjectsService.deleteCard(card);
  }
}
