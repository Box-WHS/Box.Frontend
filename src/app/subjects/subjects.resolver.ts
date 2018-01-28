import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Subject } from './subject';
import { SubjectsService } from './subjects.service';

@Injectable()
export class SubjectsResolver implements Resolve<Subject> {

  constructor(private subjectService: SubjectsService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Subject> {
    const subject = await this.subjectService.getSubject(+route.params['id']).toPromise();
    if (!subject) {
      console.warn('Invalid id passed');
      this.router.navigate(['/subjects']);
      return null;
    }
    subject.trays = await this.subjectService.getTrays(subject);

    if (!subject.trays) {
      console.warn('Failed to get trays');
      this.router.navigate(['/subjects']);
      return null;
    }

    return subject;
  }
}
