import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseSessionService} from '../service/coursesession.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesessionOptionsResolver implements Resolve<Observable<any>> {
  constructor(private courseSessionService: CourseSessionService) {
  }

  resolve() {
    return this.courseSessionService.getCourseSessionOptions();
  }
}
