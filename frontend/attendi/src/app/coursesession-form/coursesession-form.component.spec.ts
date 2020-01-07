import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesessionFormComponent } from './coursesession-form.component';

describe('CoursesessionFormComponent', () => {
  let component: CoursesessionFormComponent;
  let fixture: ComponentFixture<CoursesessionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesessionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
