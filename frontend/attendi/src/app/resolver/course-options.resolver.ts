import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseService} from '../service/course.service';

@Injectable({
  providedIn: 'root'
})
export class CourseOptionsResolver implements Resolve<Observable<any>> {
  constructor(private courseService: CourseService) {
  }

  resolve() {
    return this.courseService.getCourseOptions();
  }
}
