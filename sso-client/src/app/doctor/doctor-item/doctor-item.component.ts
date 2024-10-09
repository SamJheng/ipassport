import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { DoctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Doctor, WeeklySchedules } from '../models/doctor';
import { DayOfWeek, DayOfWeekOrder } from 'src/app/shared/models/day-of-week.enum';

@Component({
  selector: 'app-doctor-item',
  standalone: true,
  imports: [CommonModule, ZorroModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './doctor-item.component.html',
  styleUrl: './doctor-item.component.scss',
})
export class DoctorItemComponent {
  private doctorService = inject(DoctorService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  id: string;
  form!: FormGroup;
  doctor!: Doctor;
  dayOfWeekArray: string[] = Object.values(DayOfWeek);
  constructor() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      profile: this.fb.group({
        age: [null, Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        contact: ['', Validators.required],
      }),
      doctorInfo: this.fb.group({
        title: ['', Validators.required],
        education: ['', Validators.required],
        experience: ['', Validators.required],
        specialty: ['', Validators.required],
        treatmentScope: ['', Validators.required],
        workPlace: ['', Validators.required],
        weeklySchedules: this.fb.array([]),
      }),
    });
    this.doctorService
      .getDoctorById(this.id)
      .pipe(map((res) => res.result))
      .subscribe((res) => {
        this.doctor = res!;
        if (this.doctor.profile) {
          this.setDoctorProfile(this.doctor);
        }
        if (this.doctor.doctorInfo) {
          this.setDoctorInfo(this.doctor);
        }
        console.log(res);
      });
  }
  get ageControl() {
    return this.form.get('profile.age');
  }

  get genderControl() {
    return this.form.get('profile.gender');
  }

  get addressControl() {
    return this.form.get('profile.address');
  }

  get contactControl() {
    return this.form.get('profile.contact');
  }
  get titleControl() {
    return this.form.get('doctorInfo.title');
  }

  get educationControl() {
    return this.form.get('doctorInfo.education');
  }

  get experienceControl() {
    return this.form.get('doctorInfo.experience');
  }

  get specialtyControl() {
    return this.form.get('doctorInfo.specialty');
  }

  get treatmentScopeControl() {
    return this.form.get('doctorInfo.treatmentScope');
  }

  get workPlaceControl() {
    return this.form.get('doctorInfo.workPlace');
  }
  get weeklyScheduleControls(): FormArray {
    return this.form.get('doctorInfo.weeklySchedules') as FormArray;
  }
  setDoctorProfile(doctor: Doctor) {
    this.ageControl?.setValue(doctor.profile?.age);
    this.genderControl?.setValue(doctor.profile?.gender);
    this.addressControl?.setValue(doctor.profile?.address);
    this.contactControl?.setValue(doctor.profile?.contact);
  }
  setDoctorInfo(doctor: Doctor) {
    this.titleControl?.setValue(doctor.doctorInfo.title);
    this.educationControl?.setValue(doctor.doctorInfo.education);
    this.experienceControl?.setValue(doctor.doctorInfo.experience);
    this.specialtyControl?.setValue(doctor.doctorInfo.specialty);
    this.treatmentScopeControl?.setValue(doctor.doctorInfo.treatmentScope);
    this.workPlaceControl?.setValue(doctor.doctorInfo.workPlace);
    this.setWeeklySchedules(this.doctor.doctorInfo.weeklySchedules);
  }
  setWeeklySchedules(weeklySchedules: WeeklySchedules[]) {
    weeklySchedules.sort((a, b) => {
      return DayOfWeekOrder[a.DayOfWeek] - DayOfWeekOrder[b.DayOfWeek];
    });
    for (const i of weeklySchedules) {
      this.weeklyScheduleControls.push(
        this.fb.group({
          id: [i.id],
          DayOfWeek: [i.DayOfWeek],
          StartTime: [i.StartTime],
          EndTime: [i.EndTime],
        })
      );
    }
  }
  addWeeklySchedule() {
    this.weeklyScheduleControls.push(
      this.fb.group({
        DayOfWeek: [null],
        StartTime: [null],
        EndTime: [null],
      })
    );
  }
  deleteWeeklySchedule(index: number, form: AbstractControl) {
    const id = form.get('id')?.getRawValue();
    if (!id) {
      return;
    }
    if (this.weeklyScheduleControls.length > 1) {
      this.doctorService.removeDoctorSchedule(id).subscribe((res)=>{
         this.weeklyScheduleControls.removeAt(index);
      });
    }
  }
  sumbitForm() {
    const data = this.form.getRawValue();
    console.log(data);
    this.doctorService.updateDoctorById(this.id, data).subscribe((res) => {
      console.log(res);
    });
  }
}