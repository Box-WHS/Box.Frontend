import { Component } from '@angular/core';
import { Subject } from './subject';
import { AppComponent } from '../app.component';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent {
  subject: Subject = { id: 0, name: 'Test', learnProgress: 20 };

  constructor() {
    AppComponent.pageTitle = `Fach ${this.subject.name}`;
  }
}
