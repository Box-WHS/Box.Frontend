import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subject } from './subject';
import { Observable } from 'rxjs/Observable';

export class SubjectsDataSource extends DataSource<Subject> {
  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return null;
  }
  disconnect() {}
}
