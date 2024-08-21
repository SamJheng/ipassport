import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ZorroModule } from '../shared/ng-zorro-antd.module';
import { DashboardService } from './services/dashboard.service';
import { map, Observable } from 'rxjs';
import { JWTUser, User } from '../shared/models/user';
import { ResponseResult } from '../shared/models/respone';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    ZorroModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
})
export class DashboardComponent {
  dashboardService = inject(DashboardService);
  profile$: Observable<User | null>;
  constructor() {
    this.profile$ = this.dashboardService
      .getProfile()
      .pipe(map((res) => res.result));
    this.dashboardService.getProfile().subscribe(console.log);
  }
}
