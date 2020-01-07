import { TestBed } from '@angular/core/testing';

import { AttendanceItemService } from './attendance-item.service';

describe('AttendanceItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceItemService = TestBed.get(AttendanceItemService);
    expect(service).toBeTruthy();
  });
});
