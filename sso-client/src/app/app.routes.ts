import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './shared/auth/guards/guards';
import { ListComponent } from './user/list/list.component';
export const routes: Routes = [
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
        component: ListComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
