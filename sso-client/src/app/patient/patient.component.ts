import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
  providers: [PatientService],
})
export class PatientComponent {}
