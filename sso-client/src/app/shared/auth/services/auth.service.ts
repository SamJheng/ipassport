import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagerService } from '../../lib/cookie-manager.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  url = 'http://localhost:3000/auth/login'
  constructor(
    cookieManagerService: CookieManagerService,
    private http: HttpClient
  ){
  }
  singin(username:string, password:string){
    return this.http.post(this.url,{
      username,
      password
    })
  }
}
