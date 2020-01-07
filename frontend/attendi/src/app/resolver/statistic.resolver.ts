import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {StatisticService} from '../service/statistic.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticResolver implements Resolve<Observable<any>> {
  constructor(private statisticService: StatisticService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.statisticService.getStatisticList();
  }
}
