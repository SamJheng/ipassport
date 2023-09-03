import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {
    // console.log(this)
    this.getAll().subscribe(console.log)
  }
  getAll() {
    return this.http.get(`${this.url}/users`)
  }
}
