import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorService } from './services/doctor.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
  providers: [DoctorService],
})
export class DoctorComponent {}
