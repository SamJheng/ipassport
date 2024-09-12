import { Component, inject } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { PersonComponent } from 'src/app/shared/components/person/person.component';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent {
  private patientService = inject(PatientService);
  router = inject(Router);
  patientList$: Observable<User[]>;
  constructor() {
    this.patientList$ = this.patientService
      .getAllPatient()
      .pipe(map((res) => res.result!));
  }
  openPatientItem(id: string) {
    this.router.navigate([`patient/${id}`]);
  }
}
