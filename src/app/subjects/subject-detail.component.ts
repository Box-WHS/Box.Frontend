import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from './subject';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsDataSource } from './subjects-data-source';
import { SubjectsService } from './subjects.service';
import 'rxjs/add/operator/map';
import { AppComponent } from '../app.component';
import { Tray } from './tray';

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
        this.subjectService.getTrays(data).subscribe(trays => this.trays = trays);
      });
    });
  }

  ngOnDestroy(): void {
    this.route.params.subscribe().unsubscribe();
  }

  public cardsExist(): boolean {
    if (!this.trays) {
      return false;
    }

    this.trays.forEach(tray => {
      if (tray.cards && tray.cards.length > 0) {
        return true;
      }
    });
  }

  redirectToLearn() {
    this.router.navigate(['learn']);
  }
}
