import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserList() {
    return this.http.get('/api/user/list');
  }

  createUser(user) {
    return this.http.post('/api/user/create', user);
  }

  updateUser(user) {
    return this.http.put('/api/user/' + user.id + 'update', user);
  }
}
