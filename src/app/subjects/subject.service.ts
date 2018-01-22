import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Subject } from './subject';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class SubjectService {
  constructor(private http: AuthHttp) {
  }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get(`${environment.api.apiUrl}/Box`).map(data => {
      return data.json() as Subject[];
    }).catch(error => {
      console.log(error);
      return Observable.of(null);
    });
  }
}
