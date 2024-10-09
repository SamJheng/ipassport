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
import { PatientItemComponent } from './patient/patient-item/patient-item.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ProfileSetupComponent } from './auth/profile-setup/profile-setup.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { DoctorItemComponent } from './doctor/doctor-item/doctor-item.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'dashborard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'redirect',
    component: RedirectComponent,
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
      {
        path: 'profile',
        component: ProfileSetupComponent,
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
      {
        path: ':id',
        component: PatientItemComponent,
      },
    ],
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: DoctorListComponent,
      },
      {
        path: ':id',
        component: DoctorItemComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
