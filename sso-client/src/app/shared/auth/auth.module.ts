import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { GoogleModule } from './google/google.module';
import { environment } from 'src/environments/environment';
import { configuration } from '../models/tap.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleModule.forRoot(environment.googleConfig as configuration)
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
