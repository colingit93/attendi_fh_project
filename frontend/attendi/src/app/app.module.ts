import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserFormComponent} from './user-form/user-form.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule, MatStepperModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesessionFormComponent } from './coursesession-form/coursesession-form.component';
import { CoursesessionListComponent } from './coursesession-list/coursesession-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import {DateComponent} from './date/date.component';
import { StatisticListComponent } from './statistic-list/statistic-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    CourseFormComponent,
    CourseListComponent,
    CoursesessionFormComponent,
    CoursesessionListComponent,
    UserListComponent,
    AttendanceListComponent,
    DateComponent,
    StatisticListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
