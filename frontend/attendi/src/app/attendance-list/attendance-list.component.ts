import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AttendanceItemService} from '../service/attendance-item.service';


@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {

  attendancelist: any[];
  displayedColumns = ['student', 'present', 'absence_note', 'id'];

  constructor(private http: HttpClient, private attendanceItemService: AttendanceItemService) { }

  ngOnInit() {
    this.attendanceItemService.getAttendanceList()
      .subscribe((response: any[]) => {
        this.attendancelist = response;
      });
  }

}
