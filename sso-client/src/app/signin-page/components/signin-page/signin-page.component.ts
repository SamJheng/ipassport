import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {
  constructor(
    public authService: AuthService
    ){
  }
}
