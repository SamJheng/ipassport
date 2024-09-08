export interface Role {
  id: number | string;
  name: string;
}
export interface AccessObject {
  id: number | string;
  name: string;
}
export interface Access {
  id: string;
  object: AccessObject;
  role:Role;
}