import { Component, inject } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-patient-item',
  standalone: true,
  imports: [CommonModule, ZorroModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './patient-item.component.html',
  styleUrl: './patient-item.component.scss',
})
export class PatientItemComponent {
  private patientService = inject(PatientService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  id: string;
  form!: FormGroup;
  patient!: Patient;
  constructor() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      profile: this.fb.group({
        age: [null, Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        contact: ['', Validators.required],
        // photo: ['', Validators.required],
        // birthday: ['', Validators.required],
      }),
      patientInfo: this.fb.group({
        patientId: ['', Validators.required],
        allergies: ['', Validators.required],
        medicalHistory: ['', Validators.required],
        insuranceInformation: ['', Validators.required],
      }),
    });
    this.patientService
      .getPatientById(this.id)
      .pipe(map((res) => res.result))
      .subscribe((res) => {
        this.patient = res!;
        if (this.patient.profile) {
          this.setPatientProfile(this.patient);
        }
        if (this.patient.patientInfo) {
          this.setPatientInfo(this.patient);
        }
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

  // get photoControl() {
  //   return this.form.get('profile.photo');
  // }

  // get birthdayControl() {
  //   return this.form.get('profile.birthday');
  // }

  get patientIdControl() {
    return this.form.get('patientInfo.patientId');
  }

  get allergiesControl() {
    return this.form.get('patientInfo.allergies');
  }

  get medicalHistoryControl() {
    return this.form.get('patientInfo.medicalHistory');
  }

  get insuranceInformationControl() {
    return this.form.get('patientInfo.insuranceInformation');
  }

  setPatientProfile(patient: Patient) {
    this.ageControl?.setValue(patient.profile?.age);
    this.genderControl?.setValue(patient.profile?.gender);
    this.addressControl?.setValue(patient.profile?.address);
    this.contactControl?.setValue(patient.profile?.contact);
  }
  setPatientInfo(patient: Patient) {
    this.patientIdControl?.setValue(patient.patientInfo.patientId);
    this.allergiesControl?.setValue(patient.patientInfo.allergies);
    this.medicalHistoryControl?.setValue(patient.patientInfo.medicalHistory);
    this.insuranceInformationControl?.setValue(
      patient.patientInfo.insuranceInformation
    );
  }
  sumbitForm(){
    const data = this.form.getRawValue();
    console.log(data);
    this.patientService.putUpdatePatient(this.id, data).subscribe(res=>{
      console.log(res)
    })
  }
}
