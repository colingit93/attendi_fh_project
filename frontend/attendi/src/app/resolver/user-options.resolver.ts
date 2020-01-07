import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserOptionsResolver implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {
  }

  resolve() {
    return this.userService.getUserOptions();
  }
}
