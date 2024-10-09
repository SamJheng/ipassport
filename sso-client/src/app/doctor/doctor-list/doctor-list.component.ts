import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PersonComponent } from 'src/app/shared/components/person/person.component';
import { DoctorService } from '../services/doctor.service';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent {
  private doctorService = inject(DoctorService);
  router = inject(Router);
  doctorList$: Observable<User[]>;
  constructor() {
    this.doctorList$ = this.doctorService
      .getAllDoctor()
      .pipe(map((res) => res.result!));
  }
  openItem(id: string) {
    this.router.navigate([`doctor/${id}`]);
  }
}
