import { TestBed } from '@angular/core/testing';

import { StudentGroupService } from './student-group.service';

describe('StudentGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentGroupService = TestBed.get(StudentGroupService);
    expect(service).toBeTruthy();
  });
});
