import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUser(route.paramMap.get('id'));
  }

}
