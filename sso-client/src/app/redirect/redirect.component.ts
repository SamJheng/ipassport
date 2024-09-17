import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth/services/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
  providers: [AuthService],
})
export class RedirectComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    this.authService
      .getProfile()
      .pipe(map((res) => res.result))
      .subscribe((res) => {
        if (!res?.profile) {
          this.router.navigate([`auth/profile`]);
          // console.log('has not profile');
        } else {
          this.router.navigate(['dashborard']);
          // console.log('has profile');
        }
      });
  }
}
