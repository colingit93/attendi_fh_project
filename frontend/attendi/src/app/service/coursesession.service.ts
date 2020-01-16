import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseSessionService {

  constructor(private http: HttpClient) { }

  getMyCourseSessions(group) {
    return this.http.get('/api/coursesession/' + group + '/list');
  }

  getAllCourseSessions() {
    return this.http.get('/api/coursesession/list');
  }

  createCourseSession(coursesession) {
    return this.http.post('/api/coursesession/create', coursesession);
  }

  updateCourseSession(coursesession) {
    return this.http.put('/api/coursesession/' + coursesession.id + '/update', coursesession);
  }

  getCourseSession(id) {
    return this.http.get('/api/coursesession/' + id + '/get');
  }

  deleteCourseSession(coursesession) {
    return this.http.delete('/api/coursesession/' + coursesession.id + '/delete');
  }

  getCourseSessionOptions() {
    return this.http.get <any[]> ('/api/coursesession/options');
  }

}
