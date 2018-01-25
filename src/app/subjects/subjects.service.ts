import { Injectable } from '@angular/core';
import { AuthHttp, AuthHttpError } from 'angular2-jwt';
import { Subject } from './subject';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Tray } from './tray';
import { Card } from './card';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SubjectsService {
  constructor(private http: AuthHttp, private authService: AuthService) {
  }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get(`${environment.api.apiUrl}/Box`).map(data => {
      return data.json() as Subject[];
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public getSubject(id: number): Observable<Subject> {
    return this.http.get(`${environment.api.apiUrl}/Box/${id}`).map(data => {
      return data.json() as Subject;
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public editSubject(id: number, name: string): Observable<Subject> {
    return this.http.put(`${environment.api.apiUrl}/Box`, { id: id, newName: name }).map(data => {
      return data.json() as Subject;
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public getTrays(subject: Subject): Observable<Tray[]> {
    return this.http.get(`${environment.api.apiUrl}/Box/${subject.id}/trays`).map(data => {
      let result = data.json() as Tray[];
      result = result.sort((a, b) => a.name.localeCompare(b.name));
      result.forEach(current => {
        this.getCards(current).subscribe(cards => current.cards = cards);
      });
      return result;
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public getCards(tray: Tray): Observable<Card[]> {
    return this.http.get(`${environment.api.apiUrl}/Box/${tray.boxId}/tray/${tray.id}/cards`).map(data => {
      return data.json() as Card[];
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public createSubject(name: string): Observable<Subject> {
    return this.http.post(`${environment.api.apiUrl}/Box`, { name: name }).map(data => {
      return data.json() as Subject;
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public createTray(subject: Subject, name: string, interval: string): Observable<Tray> {
    return this.http.post(`${environment.api.apiUrl}/Box/${subject.id}/Tray`, { name: name, interval: interval }).map(data => {
      return data.json() as Tray;
    }).catch(error => {
      return this.handleError(error);
    });
  }

  public createCard(tray: Tray, question: string, answer: string): Observable<Card> {
    return this.http.post(`${environment.api.apiUrl}/Box/${tray.boxId}/Tray/${tray.id}/card`, { question: question, answer: answer }).map(data => {
      return data.json() as Card;
    }).catch(error => {
      return this.handleError(error);
    });
  }

  private handleError(error): Observable<any> {
    if (error.status === 401 || typeof error === typeof AuthHttpError) {
      this.authService.logout();
    }

    console.log(error);
    return Observable.of(null);
  }
}
