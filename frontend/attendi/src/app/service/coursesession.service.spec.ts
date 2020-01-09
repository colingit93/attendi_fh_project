import { TestBed } from '@angular/core/testing';

import { CourseSessionService } from './coursesession.service';

describe('CourseSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseSessionService = TestBed.get(CourseSessionService);
    expect(service).toBeTruthy();
  });
});
