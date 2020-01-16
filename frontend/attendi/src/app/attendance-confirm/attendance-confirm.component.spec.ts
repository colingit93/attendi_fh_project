import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceConfirmComponent } from './attendance-confirm.component';

describe('AttendanceConfirmComponent', () => {
  let component: AttendanceConfirmComponent;
  let fixture: ComponentFixture<AttendanceConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
