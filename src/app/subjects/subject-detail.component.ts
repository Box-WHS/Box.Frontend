import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from './subject';
import { AppComponent } from '../app.component';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectsDataSource} from "./subjects-data-source";
import {forEach} from "@angular/router/src/utils/collection";

import 'rxjs/add/operator/map';
import { SubjectService } from './subject.service';


@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subject: Subject;
  subjectDs: SubjectsDataSource | null;
  subjects: Subject[];

  constructor(private router: Router,
              private route: ActivatedRoute, private subjectService: SubjectService) {
    this.subjectDs = new SubjectsDataSource(subjectService);
    // this.subjects = this.subjectDs.subjects;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      console.log(id);

      this.subject = this.subjects.find(sub => sub.id === id);
      AppComponent.pageTitle = `Fach ${this.subject.name}`;
      console.log(this.subject);
    });
  }

  ngOnDestroy(): void {
    this.route.params.subscribe().unsubscribe();
  }

  redirectToLearn() {
    this.router.navigate(['learn']);
  }
}
