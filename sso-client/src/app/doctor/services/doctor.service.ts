import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseResult } from 'src/app/shared/models/respone';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';

@Injectable()
export class DoctorService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllDoctor() {
    return this.http.get<ResponseResult<User[]>>(`${this.url}/doctor`);
  }
  getDoctorById(id: string) {
    return this.http.get<ResponseResult<Doctor>>(`${this.url}/doctor/${id}`);
  }
  updateDoctorById(id: string, doctor: Doctor) {
    return this.http.put<ResponseResult>(`${this.url}/doctor/${id}`, doctor);
  }
}
