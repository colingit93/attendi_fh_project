import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceItemService {

  constructor(private http: HttpClient) {
  }

  getUserAttendanceList(userId) {
    return this.http.get <any[]>('/api/attendance_item/' + userId + '/list');
  }

  getAttendanceOptions() {
    return this.http.get <any[]>('/api/attendance_item/options');
  }

  getAttendanceItem(id) {
    return this.http.get('/api/attendance_item/' + id + '/get');
  }

  updateAttendanceItem(attendanceItem) {
    return this.http.put('/api/attendance_item/' + attendanceItem.id + '/update', attendanceItem);
  }
}
