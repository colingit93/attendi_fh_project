import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get('/api/course/list');
  }

  createCourse(course) {
    return this.http.post('/api/course/create', course);
  }

  updateCourse(course) {
    return this.http.put('/api/course/' + course.id + '/update', course);
  }

  getCourse(id) {
    return this.http.get('/api/course/' + id + '/get');
  }

  deleteCourse(course) {
    return this.http.delete('/api/course/' + course.id + '/delete');
  }

  getCourseOptions() {
    return this.http.get <any[]> ('/api/course/options');
  }

}
