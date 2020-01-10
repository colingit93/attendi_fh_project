import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseFormComponent} from './course-form/course-form.component';
import {CoursesessionFormComponent} from './coursesession-form/coursesession-form.component';
import {CoursesessionOptionsResolver} from './resolver/coursesession-options.resolver';
import {UserOptionsResolver} from './resolver/user-options.resolver';
import {CourseResolver} from './resolver/course.resolver';
import {CoursesessionResolver} from './resolver/coursesession.resolver';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserResolver} from './resolver/user.resolver';
import {CourseListComponent} from './course-list/course-list.component';
import {ProfileResolver} from './resolver/profile.resolver';
import {StatisticListComponent} from './statistic-list/statistic-list.component';
import {CoursesessionListComponent} from './coursesession-list/coursesession-list.component';
import {AttendanceListComponent} from './attendance-list/attendance-list.component';
import {AttendanceitemResolver} from './resolver/attendanceitem.resolver';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: '', redirectTo: 'attendance-list', pathMatch: 'full'},
  {path: 'course-list', component: CourseListComponent},
  { path: 'course-form', component: CourseFormComponent, resolve: {
      sessionOptions: CoursesessionOptionsResolver,
      userOptions: UserOptionsResolver}},
  {path: 'course-form/:id', component: CourseFormComponent, resolve: {
      sessionOptions: CoursesessionOptionsResolver,
      userOptions: UserOptionsResolver,
      course: CourseResolver}},
  {path: 'coursesession-list', component: CoursesessionListComponent},
  { path: 'coursesession-form', component: CoursesessionFormComponent, resolve: {
      courseOptions: CoursesessionOptionsResolver}},
  {path: 'coursesession-form/:id', component: CoursesessionFormComponent, resolve: {
      courseOptions: CourseResolver,
      sessionOptions: CoursesessionOptionsResolver,
      coursesession: CoursesessionResolver}},
  {path: 'user-list', component: UserListComponent},
  {path: 'user-form', component: UserFormComponent},
  {
    path: 'user-form/:id', component: UserFormComponent, resolve: {
      user: UserResolver,
      profile: ProfileResolver
    }
  },
  {path: 'show-statistic', component: StatisticListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
