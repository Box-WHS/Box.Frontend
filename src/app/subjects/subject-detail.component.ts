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
  subjectDs: SubjectsDataSource;
  public subject: Subject;

  constructor(private router: Router,
              private route: ActivatedRoute, private subjectService: SubjectsService) {
    this.subjectDs = new SubjectsDataSource(subjectService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.subjectService.getSubject(id).subscribe(data => {
        this.subject = data;
        AppComponent.pageTitle = `Fach ${data.name}`;
      });
    });
  }

  ngOnDestroy(): void {
    this.route.params.subscribe().unsubscribe();
  }

  redirectToLearn() {
    this.router.navigate(['learn']);
  }
}
