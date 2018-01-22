import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subject } from './subject';
import { Observable } from 'rxjs/Rx';
import { SubjectService } from './subject.service';

export class SubjectsDataSource extends DataSource<any> {

  constructor(private subjectService: SubjectService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return this.subjectService.getSubjects();
  }
  disconnect() {}
}
