import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subject } from './subject';
import { Observable } from 'rxjs/Rx';
import { SubjectsService } from './subjects.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export class SubjectsDataSource extends DataSource<any> {

  public subjects: BehaviorSubject<Subject[]>;

  constructor(private subjectService: SubjectsService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    this.subjects = this.subjectService.getSubjects();
    return this.subjects;
  }

  public addBox(subject: Subject) {
    this.subjects.subscribe(data => {
      data.push(subject);
      this.subjects.next(data);
    });
  }

  disconnect() {}
}
