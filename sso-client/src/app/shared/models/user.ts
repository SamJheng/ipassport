export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  isActive: boolean;
  created?: Date;
  profile?: Profile;
}
export interface Profile {
  id: string;
  gender: string;
  photo: string;
  age: number;
  contact: string;
  birthday: string;
  address: string;
  roleType?:{id:number, name:string}
}
export interface JWTUser {
  sub: string;
  username: string;
  scope: string[];
  email: string;
  exp: number;
  iat:number;
}
export interface EditUserBody{
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  active: boolean;
  profile: EditUserProfile;
}
export interface EditUserProfile{
  gender: string;
  photo: string;
  birthday: string;
}
export interface SignupUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  active: boolean;
}