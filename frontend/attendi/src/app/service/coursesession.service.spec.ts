import { TestBed } from '@angular/core/testing';

import { CourseSessionService } from './course_session.service';

describe('CourseSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseSessionService = TestBed.get(CourseSessionService);
    expect(service).toBeTruthy();
  });
});
