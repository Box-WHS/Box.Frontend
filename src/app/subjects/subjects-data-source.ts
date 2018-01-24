import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subject } from './subject';
import { Observable } from 'rxjs/Rx';
import { SubjectsService } from './subjects.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export class SubjectsDataSource extends DataSource<any> {

  constructor(private subjectService: SubjectsService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return this.subjectService.getSubjects();
  }

  disconnect() {}
}
