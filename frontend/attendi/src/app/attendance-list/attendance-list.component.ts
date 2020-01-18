import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AttendanceItemService} from '../service/attendance-item.service';
import {FormBuilder, Validators} from '@angular/forms';
import {CourseService} from '../service/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})


export class AttendanceListComponent implements OnInit {

  /*
    attendancelist: any[];
    displayedColumns = ['student', 'present', 'absence_note', 'id'];

    constructor(private http: HttpClient, private attendanceItemService: AttendanceItemService) { }

    ngOnInit() {
      this.attendanceItemService.getAttendanceList()
        .subscribe((response: any[]) => {
          this.attendancelist = response;
        });
    } */



  attendanceFormGroup;
  constructor(private fb: FormBuilder, private courseService: CourseService, private route: ActivatedRoute, private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;

    this.attendanceFormGroup = this.fb.group({
      id: [null],
      student: ['', [Validators.required]],
      present: [false],
      absence_note: [],
    });

    if (data.absence) {
      this.attendanceFormGroup.patchValue(data.absence);
    }
  }

}
