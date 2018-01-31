import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { StorageService } from '../storage/storage.service';
import { Tray } from './tray';
import { Subject } from './subject';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { Card } from './card';
import { NotificationsService } from 'angular2-notifications/dist';

@Component({
  templateUrl: './subject-learn.component.html',
  styleUrls: ['./subject-learn.component.scss'],
  animations: [
    trigger('boxesState', [
      state('1', style({
        transform: 'translateY(73%)'
      })),
      state('0', style({
        transform: 'translateY(0%)'
      })),
      transition('0 => 1', animate(350, keyframes([
        style({transform: 'translateY(86%)', offset: 0.5}),
        style({transform: 'translateY(73%)', offset: 1})
      ]))),
      transition('1 => 0', animate(350, keyframes([
        style({transform: 'translateY(-13%)', offset: 0.5}),
        style({transform: 'translateY(0%)', offset: 1})
      ])))
    ])
  ]
})
export class SubjectLearnComponent implements OnInit {

  readonly boxesMinimzedStorageKey = 'box-learn-boxes-minimized';
  subject: Subject;
  showAnswer = false;
  currentTrayIndex = -1;
  subjectLearned = false;
  currentCard: Card;
  boxesMinimized = this.storageService.getBool(this.boxesMinimzedStorageKey, false);

  answerForm = this.formBuilder.group({
    answer: ''
  });

  constructor(private formBuilder: FormBuilder,
              public storageService: StorageService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationsService: NotificationsService,
              private subjectsService: SubjectsService) {
  }

  ngOnInit(): void {
    this.subject = this.route.snapshot.data.data as Subject;
    AppComponent.pageTitle = `Fach ${this.subject.name} lernen`;
    for (let i = 0; i < this.subject.trays.length; i++) {
      if (this.subject.trays[i].cards.length > 0) {
        if (i === this.subject.trays.length - 1) {
          this.subjectLearned = true;
          break;
        }
        this.currentTrayIndex = i;
        this.currentCard = this.subject.trays[i].cards[0];
        break;
      }
    }
    if (this.currentTrayIndex === -1 && !this.subjectLearned) {
      this.router.navigate(['/subjects']);
      this.notificationsService.warn('Keine Karten vorhanden', 'Bitte füge Karten hinzu, um dieses Fach zu lernen');
      return;
    }
  }

  answerSubmitted() {
    if (this.answerForm.controls.answer.value === this.currentCard.answer) {
      this.answerForm.controls.answer.setValue('');
      this.moveCard(this.subject.trays[this.currentTrayIndex], this.subject.trays[this.currentTrayIndex + 1], this.currentCard);
      this.selectNextCard();
      this.notificationsService.success('Richtig', 'Frage richtig beantwortet');
      return;
    }

    this.showAnswer = true;
  }

  private moveCard(currentTray: Tray, targetTray: Tray, card: Card): void {
    const index = currentTray.cards.indexOf(card);
    console.log(index);
    console.log(currentTray.cards);
    if (index > -1) {
      currentTray.cards.splice(index, 1);
      console.log(currentTray.cards);
      this.subjectsService.moveCard(card, targetTray).subscribe();
      targetTray.cards.push(card);
    }
  }

  private selectNextCard(): void {
    // TODO: handle if all cards are learned
    if (this.subject.trays[this.currentTrayIndex].cards.length === 0) {
      this.currentTrayIndex++;
      if (this.currentTrayIndex > this.subject.trays.length - 1) {
        this.subjectLearned = true;
      }
      return;
    }
    this.currentCard = this.subject.trays[this.currentTrayIndex].cards[0];
  }

  /*
  public skipCard(): void {
    this.answerForm.controls.answer.setValue('');
    this.selectNextCard();
  }*/

  public answerReviewed(answerCorrect: boolean): void {
    this.showAnswer = false;
    this.answerForm.controls.answer.setValue('');

    const targetTrayIndex = answerCorrect ? this.currentTrayIndex + 1 : Math.max(this.currentTrayIndex - 1, 0);
    console.log(targetTrayIndex);
    this.moveCard(this.subject.trays[this.currentTrayIndex], this.subject.trays[targetTrayIndex], this.currentCard);
    this.selectNextCard();
  }

  public selectTray(tray: Tray): void {
    this.currentTrayIndex = this.subject.trays.indexOf(tray);
    this.currentCard = this.subject.trays[this.currentTrayIndex].cards[0];
  }

  public toggleBoxes(): void {
    this.boxesMinimized = !this.boxesMinimized;
    this.storageService.setBool(this.boxesMinimzedStorageKey, this.boxesMinimized);
  }
}
