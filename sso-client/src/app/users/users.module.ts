import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UsersService } from './service/users.service';
import { UsersRoutingModule } from './users-routing.module';
import { AuthInterceptor } from '../shared/auth/Interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UsersService
  ]
})
export class UsersModule { }
