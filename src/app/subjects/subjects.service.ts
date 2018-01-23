import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Subject } from './subject';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Tray } from './tray';

@Injectable()
export class SubjectsService {
  constructor(private http: AuthHttp) {
  }

  public getSubjects(): BehaviorSubject<Subject[]> {
    const subject = new BehaviorSubject<Subject[]>(null);

    this.http.get(`${environment.api.apiUrl}/Box`).map(data => {
      subject.next(data.json() as Subject[]);
    }).catch(error => {
      console.log(error);
      return null;
    });

    return subject;
  }

  public getTrays(subject: Subject): Observable<Tray[]> {
    return this.http.get(`${environment.api.apiUrl}/Box/${subject.id}/trays`).map(data => {
      return data.json() as Tray[];
    }).catch(error => {
      console.log(error);
      return null;
    });
  }
}
