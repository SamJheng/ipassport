import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllUser(){
    return this.http.get(this.url + '/users')
  }
}
