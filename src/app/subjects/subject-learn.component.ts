import { Component,trigger,} from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  templateUrl: './subject-learn.component.html',
  styleUrls: ['./subject-learn.component.scss']
})
export class SubjectLearnComponent {

  showAnswer = false;

  answerForm = this.formBuilder.group({
    answer: ['']
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
