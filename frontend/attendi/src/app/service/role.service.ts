import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  roles = {
    L: 'Lecturer',
    S: 'Student'
  };
}
