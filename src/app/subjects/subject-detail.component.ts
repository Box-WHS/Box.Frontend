import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from './subject';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsDataSource } from './subjects-data-source';
import { SubjectsService } from './subjects.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subjectDs: SubjectsDataSource;

  constructor(private router: Router,
              private route: ActivatedRoute, private subjectService: SubjectsService) {
    this.subjectDs = new SubjectsDataSource(subjectService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.subjectDs.subjects.subscribe(data => {
        const result = data.find(sub => sub.id === id);
        if (result) {
          AppComponent.pageTitle = `Fach ${result.name}`;
        }
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
