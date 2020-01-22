import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {StatisticService} from "../service/statistic.service";

import {ChartOptions, ChartType, ChartDataSets, NestedTickOptions} from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-statistic-list',
  templateUrl: './statistic-list.component.html',
  styleUrls: ['./statistic-list.component.scss']
})
export class StatisticListComponent implements OnInit {

  myarray = new Array<number>();
  labelarray = new Array<string>();
  length: number;
  statisticItems: any[];
  currentUser: any;
  displayedColumns = ['statistic_course_name', 'total_course_sessions', 'total_mandatory_course_sessions', 'visited_course_sessions', 'course_sessions_missed', 'attendance_percentage'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private statisticService: StatisticService, private router: Router) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.currentUser = data.currentUser;
    this.statisticService.getStatisticList(this.currentUser.id).subscribe((response: any[]) => {
      this.statisticItems = response;
      this.length = this.statisticItems.length;
      for (let i = 0; i < this.length; i++) {
        //Iterate Statististic Items (one for each course) and save attributes to array
        this.myarray.push(this.statisticItems[i].attendance_percentage);
        this.labelarray.push(this.statisticItems[i].statistic_course_name);
      }
      });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLabels: Label[] = this.labelarray;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: this.myarray, label: 'Attendance Percentage (%)', backgroundColor: 'rgba(129, 174, 233, 0.74)', hoverBackgroundColor: 'rgba(38, 116, 217, 0.74)'},
  ];

}
