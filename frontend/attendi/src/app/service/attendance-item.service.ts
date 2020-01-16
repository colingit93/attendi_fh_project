import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceItemService {

  constructor(private http: HttpClient) {
  }

  getAttendanceList() {
    return this.http.get <any[]>('/api/attendance_item/list');
  }

  getAttendanceOptions() {
    return this.http.get <any[]>('/api/attendance_item/options');
  }

  getAttendanceItem(session, user) {
    return this.http.get('/api/attendance_item/' + session + '/' + user + '/get');
  }

  updateAttendanceItem(attendanceItem) {
    return this.http.put('/api/attendance_item/' + attendanceItem.id + '/update', attendanceItem);
  }
}
