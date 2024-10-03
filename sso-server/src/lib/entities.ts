import { Role } from '../users/models/Role.entity';
import { ObjectAccess } from '../models/ObjectAccess.entity';
import { Access } from '../users/models/Access.entity';
import { Profile } from '../users/models/Profile.entity';
import { SocialExternalProviders } from '../users/models/SocialExternalProviders.entity';
import { User } from '../users/models/User.entity';
import Log from '../log/models/log.entity';
import { PatientInfo } from '../patient/models/PatientInfo.entity';
import { RoleType } from '../users/models/RoleType.entity';
import { DoctorInfo } from '../doctor/models/DoctorInfo.entity';

const entities = [
  User,
  SocialExternalProviders,
  Profile,
  Log,
  Access,
  ObjectAccess,
  Role,
  PatientInfo,
  RoleType,
  DoctorInfo,
];

export default entities;
