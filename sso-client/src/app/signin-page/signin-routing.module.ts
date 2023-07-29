import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninPageComponent } from './components/signin-page/signin-page.component';

const routes: Routes = [
  {
    path: '',
    component: SigninPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
