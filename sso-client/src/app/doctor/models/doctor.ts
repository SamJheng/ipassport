import { DayOfWeek } from "src/app/shared/models/day-of-week.enum";
import { User } from "src/app/shared/models/user";

export interface Doctor extends User {
  doctorInfo: DoctorInfo;
}
export interface DoctorInfo {
  workPlace: string;

  specialty: string;
  title: string;

  education: string;

  experience: string;
  treatmentScope: string;
  weeklySchedules: WeeklySchedules[];
}
export interface WeeklySchedules {
  id: number;
  DayOfWeek: DayOfWeek;

  StartTime: string;

  EndTime: string;
}
