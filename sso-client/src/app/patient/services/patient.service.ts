import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseResult } from 'src/app/shared/models/respone';
import { User } from 'src/app/shared/models/user';
import { EditPatient, Patient } from '../models/patient';
@Injectable()
export class PatientService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllPatient() {
    return this.http.get<ResponseResult<User[]>>(`${this.url}/patient`);
  }
  getPatientById(id: string) {
    return this.http.get<ResponseResult<Patient>>(`${this.url}/patient/${id}`);
  }
  putUpdatePatient(id: string, data: EditPatient) {
    return this.http.put<ResponseResult>(`${this.url}/patient/${id}`, data);
  }
}
