import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSessionListComponent } from './courseSession-list.component';

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
