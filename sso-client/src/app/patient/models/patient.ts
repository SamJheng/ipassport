import { User } from "src/app/shared/models/user";

export interface Patient extends User {
  patientInfo: PatientInfo;
}
export interface PatientInfo {
  id: string;
  allergies: string;
  insuranceInformation: string;
  medicalHistory: string;
  medicalRecordNumber: number;
  patientId:string;
}
export interface EditPatient {
  profile: {
    age: number;
    gender: string;
    address: string;
    contact: string;
    // photo: string;
    // birthday: string;
  };
  patientInfo: {
    patientId: string;
    allergies:string;
    medicalHistory: string;
    insuranceInformation: string;
  };
}