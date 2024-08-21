import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './shared/auth/guards/guards';
import { UserListComponent } from './user/user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
