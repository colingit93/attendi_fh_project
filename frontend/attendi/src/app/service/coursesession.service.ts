import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseSessionService {

  constructor(private http: HttpClient) { }

  getMyCourseSessions(group) {
    return this.http.get('/api/course_session/' + group + '/list');
  }

  getAllCourseSessions() {
    return this.http.get('/api/course_session/list');
  }

  createCourseSession(courseSession) {
    return this.http.post('/api/course_session/create', courseSession);
  }

  updateCourseSession(courseSession) {
    return this.http.put('/api/course_session/' + courseSession.id + '/update', courseSession);
  }

  getCourseSession(id) {
    return this.http.get('/api/course_session/' + id + '/get');
  }

  deleteCourseSession(courseSession) {
    return this.http.delete('/api/course_session/' + courseSession.id + '/delete');
  }

  getCourseSessionOptions() {
    return this.http.get <any[]> ('/api/course_session/options');
  }

}
