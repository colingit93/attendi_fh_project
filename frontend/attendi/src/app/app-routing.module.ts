import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseFormComponent} from './course-form/course-form.component';
import {CourseSessionFormComponent} from './course-session-form/course-session-form.component';
import {UserOptionsResolver} from './resolver/user-options.resolver';
import {CourseResolver} from './resolver/course.resolver';
import {CoursesessionResolver} from './resolver/coursesession.resolver';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserResolver} from './resolver/user.resolver';
import {CourseListComponent} from './course-list/course-list.component';
import {ProfileResolver} from './resolver/profile.resolver';
import {StatisticListComponent} from './statistic-list/statistic-list.component';
import {AttendanceListComponent} from './attendance-list/attendance-list.component';
import {CourseOptionsResolver} from './resolver/course-options.resolver';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {PresentComponent} from './present/present.component';
import {GroupOptionsResolver} from './resolver/group-options.resolver';
import {CurrentUserResolver} from './resolver/currentUser.resolver';
import {CourseSessionListComponent} from './course-session-list/course-session-list.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'attendance-list', pathMatch: 'full'},
  {
    path: 'course-list', component: CourseListComponent, canActivate: [AuthGuard], resolve: {
      currentUser: CurrentUserResolver
    }
  },
  {
    path: 'course-form', component: CourseFormComponent, canActivate: [AuthGuard], resolve: {
      userOptions: UserOptionsResolver,
    }
  },
  {
    path: 'course-form/:id', component: CourseFormComponent, canActivate: [AuthGuard], resolve: {
      userOptions: UserOptionsResolver,
      course: CourseResolver,
    }
  },
  {
    path: 'attendance-list', component: AttendanceListComponent, canActivate: [AuthGuard], resolve: {
      currentUser: CurrentUserResolver
    }
  },
  {
    path: 'attendance-list/:id', component: AttendanceListComponent, canActivate: [AuthGuard], resolve: {
      courseSession: CoursesessionResolver
    }
  },
  {
    path: 'course-session-form', component: CourseSessionFormComponent, canActivate: [AuthGuard], resolve: {
      courseOptions: CourseOptionsResolver
    }
  },
  {
    path: 'course-session-form/:id', component: CourseSessionFormComponent, canActivate: [AuthGuard], resolve: {
      courseOptions: CourseOptionsResolver,
      courseSession: CoursesessionResolver
    }
  },
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  {
    path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard], resolve: {
      groupOptions: GroupOptionsResolver
    }
  },
  {
    path: 'user-form/:id', component: UserFormComponent, canActivate: [AuthGuard], resolve: {
      user: UserResolver,
      profile: ProfileResolver,
      groupOptions: GroupOptionsResolver
    }
  },
  {path: 'statistic-list', component: StatisticListComponent, canActivate: [AuthGuard], resolve: {
      currentUser: CurrentUserResolver}},
  {path: 'course-session-list', component: CourseSessionListComponent, canActivate: [AuthGuard]},
  {path: 'course-session-list/:id', component: CourseSessionListComponent, canActivate: [AuthGuard], resolve: {
    course: CourseResolver
    }
  },
  {path: 'present', component: PresentComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
