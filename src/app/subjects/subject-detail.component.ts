import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from './subject';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsDataSource } from './subjects-data-source';
import { SubjectsService } from './subjects.service';
import 'rxjs/add/operator/map';
import { AppComponent } from '../app.component';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  private subjectDs: SubjectsDataSource;
  public subject: Subject;

  constructor(private router: Router,
              private route: ActivatedRoute, private subjectService: SubjectsService) {
    this.subjectDs = new SubjectsDataSource(subjectService);
  }

  ngOnInit(): void {
    this.subject = this.route.snapshot.data.data as Subject;
    AppComponent.pageTitle = `Fach ${this.subject.name}`;
  }

  cardsExist(): boolean {
    return this.subject.trays && this.subject.trays.find(value => value.cards && value.cards.length > 0) != null;
  }

  ngOnDestroy(): void {
    this.route.params.subscribe().unsubscribe();
  }
}
