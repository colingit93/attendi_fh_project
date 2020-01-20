import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }) {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['coursesession-list']);
      }, () => {
        alert('wrong username or password');
      });
  }

  logout() {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  hasPermission(permission) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    const permissions = decodedToken.permissions;
    return permission in permissions;
  }

  getCurrentUserId() {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    return decodedToken.user_id;
  }

  getUserList() {
    return this.http.get('/api/user/list');
  }

  createUser(user) {
    return this.http.post('/api/user/create', user);
  }

  updateUser(user) {
    return this.http.put('/api/user/' + user.id + '/update', user);
  }

  getUser(id) {
    return this.http.get('/api/user/' + id + '/get');
  }

  deleteUser(user) {
    return this.http.delete('/api/user/' + user.id + '/delete');
  }

  getUserOptions() {
    return this.http.get <any[]>('/api/user/options');
  }

  updateProfile(profile) {
    return this.http.put('/api/profile/' + profile.id + '/update', profile);
  }

  getProfile(id) {
    return this.http.get('/api/profile/' + id + '/get');
  }

  getProfileImage(id) {
    return this.http.get('api/media/' + id + '/get');
  }

}
