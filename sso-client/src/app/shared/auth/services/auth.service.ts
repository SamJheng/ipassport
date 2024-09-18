import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagerService } from '../../lib/cookie-manager.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseResult } from '../../models/respone';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../../lib/session-storage.service';
import { EditUserBody, SignupUser, User } from '../../models/user';

@Injectable()
export class AuthService {
  url = environment.apiUrl;
  constructor(
    private sessionStorageService: SessionStorageService,
    private http: HttpClient
  ) {}

  singin(email: string, password: string) {
    return this.http
      .post<ResponseResult>(this.url + '/auth/signin', {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.sessionStorageService.saveDataValue(
            'access_token',
            res.result.accessToken
          );
        })
      );
  }
  googleIdtokenVerify(token: string) {
    return this.http
      .get<ResponseResult>(this.url + '/google/verify?token=' + token)
      .pipe(
        tap((res) => {
          this.sessionStorageService.saveDataValue(
            'access_token',
            res.result.accessToken
          );
        })
      );
  }
  signup(body: SignupUser) {
    return this.http.post<ResponseResult<SignupUser>>(
      this.url + '/auth/signup',
      body
    );
  }
  getProfile() {
    return this.http.get<ResponseResult<User>>(this.url + '/auth/profile');
  }
  updateProfile(body: User) {
    return this.http.post<ResponseResult>(this.url + '/auth/profile', body);
  }
  getAllRoleTypes() {
    return this.http.get<ResponseResult<{ id: number; name: string }[]>>(
      `${this.url}/access/position`
    );
  }
}
