import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

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
export class SubjectLearnComponent {

  showAnswer = false;
  boxesMinimized = false;

  answerForm = this.formBuilder.group({
    answer: ''
  });

  constructor(private formBuilder: FormBuilder,public snackBar: MatSnackBar) {
    AppComponent.pageTitle = 'Fach Test lernen';
  }

  answerSubmitted() {
    console.log(this.answerForm.controls.answer.value);
    this.showAnswer = true;
  }

  answerReviewed(answerCorrect: boolean) {
    this.showAnswer = false;
    this.answerForm.controls.answer.setValue('');
  }


  public range(min, max): number[] {
    const a = [];
    for (let i = min; i <= max; i++) { a.push(i); }
    return a;
  }
}
