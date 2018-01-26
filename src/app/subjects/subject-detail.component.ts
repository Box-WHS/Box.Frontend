import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from './subject';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsDataSource } from './subjects-data-source';
import { SubjectsService } from './subjects.service';
import 'rxjs/add/operator/map';
import { AppComponent } from '../app.component';
import { Tray } from './tray';
import { Card } from './card';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  private subjectDs: SubjectsDataSource;
  public subject: Subject;
  public trays: Tray[];

  constructor(private router: Router,
              private route: ActivatedRoute, private subjectService: SubjectsService) {
    this.subjectDs = new SubjectsDataSource(subjectService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.subjectService.getSubject(id).subscribe(data => {
        AppComponent.pageTitle = `Fach ${data.name}`;
        this.subject = data;
        this.subjectService.getTrays(data).then(trays => this.trays = trays);
      });
    });
  }

  cardsExist(): boolean {
    return this.trays && this.trays.find(value => value.cards && value.cards.length > 0) != null;
  }

  ngOnDestroy(): void {
    this.route.params.subscribe().unsubscribe();
  }
}
