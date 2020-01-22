import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserFormComponent} from './user-form/user-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule, MatStepperModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSessionFormComponent } from './course-session-form/course-session-form.component';
import { CourseSessionListComponent } from './course-session-list/course-session-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import {DateComponent} from './date/date.component';
import { StatisticListComponent } from './statistic-list/statistic-list.component';
import { TimeComponent } from './time/time.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {FileUploadModule} from 'ng2-file-upload';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttperrorInterceptor} from './httperror.interceptor';
import { PresentComponent } from './present/present.component';
import { AttendanceConfirmComponent } from './attendance-confirm/attendance-confirm.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from "@angular/material/sort";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    CourseFormComponent,
    CourseListComponent,
    CourseSessionFormComponent,
    CourseSessionListComponent,
    UserListComponent,
    AttendanceListComponent,
    DateComponent,
    StatisticListComponent,
    TimeComponent,
    LoginComponent,
    LogoutComponent,
    PresentComponent,
    AttendanceConfirmComponent,
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
    FormsModule,
    NgxMaterialTimepickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    FileUploadModule,
    MatDialogModule,
    MatIconModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorInterceptor,
      multi: true,
      deps: [MatSnackBar]
    }
  ],

  bootstrap: [AppComponent],
  entryComponents: [AttendanceConfirmComponent]
})

export class AppModule {
}

