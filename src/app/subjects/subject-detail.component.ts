import { Component } from '@angular/core';
import { Subject } from './subject';
import { AppComponent } from '../app.component';
import {Router} from "@angular/router";

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent {
  subject: Subject = { id: 0, name: 'Test', learnProgress: 20 };

  constructor(private router: Router) {
    AppComponent.pageTitle = `Fach ${this.subject.name}`;
  }

  redirectToLearn() {
    this.router.navigate(['learn']);
  }
}
