import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {StatisticService} from '../service/statistic.service';

@Component({
  selector: 'app-statistic-list',
  templateUrl: './statistic-list.component.html',
  styleUrls: ['./statistic-list.component.scss']
})
export class StatisticListComponent implements OnInit {

  statisticItems: any[];
  currentUser: any;
  displayedColumns = ['statistic_course_name', 'total_course_sessions', 'total_mandatory_course_sessions', 'visited_course_sessions', 'course_sessions_missed', 'attendance_percentage'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private statisticService: StatisticService, private router: Router) {
  }

  ngOnInit() {
/*    this.http.get('/api/statistic/list/2')
      .subscribe((response: any[]) => {
        this.statistics = response;
      });*/

    const data = this.route.snapshot.data;
    if (data.courseSession) {
      const session = data.courseSession;
      this.statisticService.getStatisticList(session.id).subscribe((res: any[]) => {
        this.statisticItems = res;
      });
    } else {
      this.currentUser = data.currentUser;
      this.statisticService.getStatisticList(this.currentUser.id).subscribe((response: any[]) => {
        this.statisticItems = response;
      });
    }
  }

}
