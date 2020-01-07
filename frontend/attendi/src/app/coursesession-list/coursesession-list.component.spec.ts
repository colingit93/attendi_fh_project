import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesessionListComponent } from './coursesession-list.component';

describe('CoursesessionListComponent', () => {
  let component: CoursesessionListComponent;
  let fixture: ComponentFixture<CoursesessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesessionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
