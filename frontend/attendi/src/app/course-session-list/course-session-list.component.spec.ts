import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSessionListComponent } from './course-session-list.component';

describe('CourseSessionListComponent', () => {
  let component: CourseSessionListComponent;
  let fixture: ComponentFixture<CourseSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSessionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
