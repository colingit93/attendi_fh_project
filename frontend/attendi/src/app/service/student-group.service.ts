import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentGroupService {

  constructor() {
  }

  studentGroups = {
    L: 'Lecturers',
    G1: 'Group 1',
    G2: 'Group 2',
    G3: 'Group 3'
  };
}
