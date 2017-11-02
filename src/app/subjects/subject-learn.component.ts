import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  templateUrl: './subject-learn.component.html',
  styleUrls: ['./subject-learn.component.scss']
})
export class SubjectLearnComponent {
  range = (min, max) => {
    const a = [];
    for (let i = min; i <= max; i++) { a.push(i); }
    return a;
  };

  constructor() {
    AppComponent.pageTitle = 'Fach Test lernen';
  }
}
