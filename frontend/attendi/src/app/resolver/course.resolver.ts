import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseService} from '../service/course.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Observable<any>> {
  constructor(private courseService: CourseService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.courseService.getCourse(route.paramMap.get('id'));
  }
}
