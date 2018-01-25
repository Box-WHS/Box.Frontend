import {
  Component, OnInit,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject';
import { Tray } from './tray';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  subject: Observable<Subject>;
  trays: Tray[];
  subjectName = '';

  constructor(private route: ActivatedRoute, private subjectsService: SubjectsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.subject = this.subjectsService.getSubject(id);
      this.updateData(this.subject);
      this.subject.subscribe(data => this.subjectsService.getTrays(data).subscribe(trays => this.trays = trays));
    });
  }

  public changeSubjectName(): void {
    this.subject.subscribe(subject => {
      this.subject = this.subjectsService.editSubject(subject.id, this.subjectName);
      this.updateData(this.subject);
    });
  }

  private updateData(subject: Observable<Subject>): void {
    subject.subscribe(data => {
      this.subjectName = data.name;
      AppComponent.pageTitle = `Fach ${data.name} bearbeiten`;
    });
  }
}
