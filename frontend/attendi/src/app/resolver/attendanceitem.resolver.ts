import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AttendanceItemService} from '../service/attendance-item.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceitemResolver implements Resolve<Observable<any>> {
  constructor(private attendanceItemService: AttendanceItemService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.attendanceItemService.getAttendanceList();
  }
}
