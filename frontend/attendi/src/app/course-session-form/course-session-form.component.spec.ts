import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSessionFormComponent } from './course-session-form.component';

describe('CourseSessionFormComponent', () => {
  let component: CourseSessionFormComponent;
  let fixture: ComponentFixture<CourseSessionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSessionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
