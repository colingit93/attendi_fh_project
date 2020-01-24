import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) {
  }

  getStatisticList(sessionId) {
    return this.http.get <any[]>('/api/statistic/list/' + sessionId);
  }
}
