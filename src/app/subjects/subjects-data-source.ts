import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subject } from './subject';
import { Observable } from 'rxjs/Rx';

export class SubjectsDataSource extends DataSource<any>{

  public subjects = [
    { id: 0, name: 'Test', learnProgress: 50 },
    { id: 1, name: 'Test123', learnProgress: 20 },
    { id: 2, name: 'Test3', learnProgress: 80}
  ];

  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return Observable.of(
      this.subjects
    );
  }
  disconnect() {}
}
