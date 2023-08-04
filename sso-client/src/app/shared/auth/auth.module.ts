import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { GoogleModule } from './google/google.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleModule.forRoot({
      //Look options table for some more avaialbe options and config here.
      client_id: '407361821846-egn8l78nsqa8uqs6ffd04ql3o2v4kchs.apps.googleusercontent.com',
      cancel_on_tap_outside: false,
      authvalidate_by_googleapis: true,
      login_uri:'http://localhost:3000',
      auto_select: false,
      nonce:'aabab',
      ux_mode: "redirect",
      disable_exponential_cooldowntime: true,
      context: 'signin'
    })
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
