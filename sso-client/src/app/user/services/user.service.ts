import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseResult } from 'src/app/shared/models/respone';
import { EditUserBody, User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllUser() {
    return this.http.get<ResponseResult<User[]>>(this.url + '/users');
  }
  getUserById(id: string) {
    return this.http.get<ResponseResult<User>>(this.url + '/users/' + id);
  }
  putEditUserById(id: string, body: EditUserBody) {
    return this.http.put<ResponseResult>(this.url + '/users/' + id, body);
  }
}
