import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './auth/signin/signin.component';
export const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
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
    path: '**',
    component: NotfoundComponent,
  },
];
