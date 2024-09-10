import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseResult } from 'src/app/shared/models/respone';
import { User } from 'src/app/shared/models/user';
@Injectable()
export class PatientService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllPatient(){
    return this.http.get<ResponseResult<User[]>>(`${this.url}/patient`);
  }
}
