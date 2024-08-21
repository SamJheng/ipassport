export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  isActive: boolean;
  created?: Date;
  profile: Profile;
}
export interface Profile {
  id: string;
  gender: string;
  photo: string;
}