import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Access, AccessObject, Role } from 'src/app/shared/models/access';
import { ResponseResult } from 'src/app/shared/models/respone';
import { RoleType } from 'src/app/shared/models/role-type';
import { EditUserBody, User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllUser() {
    return this.http.get<ResponseResult<User[]>>(`${this.url}/users`);
  }

  getUserById(id: string) {
    return this.http.get<ResponseResult<User>>(`${this.url}/users/${id}`);
  }

  putEditUserById(id: string, body: EditUserBody) {
    return this.http.put<ResponseResult>(`${this.url}/users/${id}`, body);
  }

  getAccessObject() {
    return this.http.get<ResponseResult<AccessObject[]>>(
      `${this.url}/access/object`
    );
  }

  getAccessByUserid(id: string) {
    return this.http.get<ResponseResult<Access[]>>(
      `${this.url}/access/user/${id}`
    );
  }

  getAllRole() {
    return this.http.get<ResponseResult<Role[]>>(`${this.url}/access/role`);
  }

  postAccessObjectByName(name: string) {
    return this.http.post<ResponseResult>(`${this.url}/access/object`, {
      name,
    });
  }

  postCreateAccess(userId: string, objectId: string, roleId: string) {
    return this.http.post<ResponseResult>(`${this.url}/access/user/${userId}`, {
      objectId,
      roleId,
    });
  }

  deleteAccess(id: string) {
    return this.http.delete<ResponseResult>(`${this.url}/access/user/${id}`);
  }

  updateAccess(userId: string, id: string, objectId: string, roleId: string) {
    return this.http.put<ResponseResult>(`${this.url}/access/user/${userId}`, {
      id,
      objectId,
      roleId,
    });
  }
  getAllRoleTypes() {
    return this.http.get<ResponseResult<{ id: number; name: string }[]>>(
      `${this.url}/access/position`
    );
  }
  setRolePositionToUser(userId: string, role: RoleType) {
    return this.http.put<ResponseResult>(
      `${this.url}/access/position/${userId}`,
      role
    );
  }
}
