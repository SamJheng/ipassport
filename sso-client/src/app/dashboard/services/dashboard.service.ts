import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseResult } from 'src/app/shared/models/respone';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProfile() {
    return this.http.get<ResponseResult<User>>(this.url + '/auth/profile');
  }
}
