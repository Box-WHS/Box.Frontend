import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subject } from './subject';
import { Observable } from 'rxjs/Rx';

export class SubjectsDataSource extends DataSource<any> {
  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return Observable.of(
      [
        { id: 0, name: 'Test', learnProgress: 50 },
        { id: 1, name: 'Test123', learnProgress: 20 }
      ]);
  }
  disconnect() {}
}
