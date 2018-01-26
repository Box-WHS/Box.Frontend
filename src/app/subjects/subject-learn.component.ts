import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { StorageService } from '../storage/storage.service';
import { Tray } from './tray';
import { Subject } from './subject';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from './subjects.service';

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
  trays: Tray[] = [];
  subject: Subject;
  showAnswer = false;
  boxesMinimized = this.storageService.getBool(this.boxesMinimzedStorageKey, false);

  answerForm = this.formBuilder.group({
    answer: ''
  });

  constructor(private formBuilder: FormBuilder,
              public storageService: StorageService,
              private route: ActivatedRoute,
              private subjectsService: SubjectsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.subjectsService.getSubject(id).subscribe(subject => {
        this.subject = subject;
        AppComponent.pageTitle = `Fach ${subject.name} lernen`;
        this.subjectsService.getTrays(subject).then(trays => this.trays = trays);
      });
    });
  }

  answerSubmitted() {
    console.log(this.answerForm.controls.answer.value);
    this.showAnswer = true;
  }

  answerReviewed(answerCorrect: boolean) {
    this.showAnswer = false;
    this.answerForm.controls.answer.setValue('');
  }

  public toggleBoxes(): void {
    this.boxesMinimized = !this.boxesMinimized;
    this.storageService.setBool(this.boxesMinimzedStorageKey, this.boxesMinimized);
  }

  public range(min, max): number[] {
    const a = [];
    for (let i = min; i <= max; i++) { a.push(i); }
    return a;
  }
}
