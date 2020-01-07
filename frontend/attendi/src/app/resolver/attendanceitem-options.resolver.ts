import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AttendanceItemService} from '../service/attendance-item.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceitemOptionsResolver implements Resolve<Observable<any>> {
  constructor(private attendanceItemService: AttendanceItemService) {
  }

  resolve() {
    return this.attendanceItemService.getAttendanceOptions();
  }
}
