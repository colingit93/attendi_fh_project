import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseSessionService} from '../service/coursesession.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesessionResolver implements Resolve<Observable<any>> {
  constructor(private courseSessionService: CourseSessionService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.courseSessionService.getCourseSession(route.paramMap.get('id'));
  }
}
