import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './shared/auth/guards/guards';
import { UserListComponent } from './user/user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MessageComponent } from './auth/message/message.component';
import { UserAccessComponent } from './user/user-access/user-access.component';
import { PatientComponent } from './patient/patient.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
export const routes: Routes = [
  {
    path: 'dashborard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'access/:id',
        component: UserAccessComponent,
      },
    ],
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: PatientListComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
