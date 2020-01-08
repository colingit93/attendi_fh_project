import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseFormComponent} from './course-form/course-form.component';
import {CoursesessionOptionsResolver} from './resolver/coursesession-options.resolver';
import {UserOptionsResolver} from './resolver/user-options.resolver';
import {CourseResolver} from './resolver/course.resolver';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserResolver} from './resolver/user.resolver';
import {CourseListComponent} from './course-list/course-list.component';
import {ProfileResolver} from './resolver/profile.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'attendance-list', pathMatch: 'full'},
  {path: 'course-list', component: CourseListComponent},
  {
    path: 'course-form', component: CourseFormComponent, resolve: {
      coursesessionOptions: CoursesessionOptionsResolver,
      userOptions: UserOptionsResolver
    }
  },
  {
    path: 'course-form/:id', component: CourseFormComponent, resolve: {
      coursesessionOptions: CoursesessionOptionsResolver,
      userOptions: UserOptionsResolver,
      course: CourseResolver
    }
  },
  {path: 'user-list', component: UserListComponent},
  {path: 'user-form', component: UserFormComponent},
  {
    path: 'user-form/:id', component: UserFormComponent, resolve: {
      user: UserResolver,
      profile: ProfileResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
