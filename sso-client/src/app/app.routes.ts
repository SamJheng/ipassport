import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
