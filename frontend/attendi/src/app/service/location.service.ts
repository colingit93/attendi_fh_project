import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations = {
    V1: 'Vorlesungssaal 1',
    V2: 'Vorlesungssaal 2',
    V3: 'Vorlesungssaal 3',
    V4: 'Vorlesungssaal 4',
    V5: 'Vorlesungssaal 5',
    S1: 'Seminarraum 18',
    S2: 'Seminarraum 19',
    L1: 'EDV-Labor 31',
    L2: 'EDV-Labor 33',
    L3: 'EDV-Labor 41',
    L4: 'EDV-Labor 45'
  };


  constructor() {
  }
}
