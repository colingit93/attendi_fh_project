import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseSessionService {

  constructor(private http: HttpClient) { }

  getCourseSessions() {
    return this.http.get('/api/course_session/list');
  }

  createCourseSession(coursesession) {
    return this.http.post('/api/course_session/create', coursesession);
  }

  updateCourseSession(coursesession) {
    return this.http.put('/api/course_session/' + coursesession.id + '/update', coursesession);
  }

  getCourseSession(id) {
    return this.http.get('/api/course_session/' + id + '/get');
  }

  deleteCourseSession(coursesession) {
    return this.http.delete('/api/course_session/' + coursesession.id + '/delete');
  }

  getCourseSessionOptions() {
    return this.http.get <any[]> ('/api/course_session/options');
  }

}
