import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./signin-page/signin-page.module').then(m => m.SigninPageModule)
  },
  {
    path: 'dashborad',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
