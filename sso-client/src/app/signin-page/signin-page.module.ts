import { AuthModule } from './../shared/auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { SigninRoutingModule } from './signin-routing.module';



@NgModule({
  declarations: [
    SigninPageComponent
  ],
  imports: [
    CommonModule,
    SigninRoutingModule,
    AuthModule
  ]
})
export class SigninPageModule { }
