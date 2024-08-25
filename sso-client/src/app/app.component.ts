import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZorroModule } from './shared/ng-zorro-antd.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZorroModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sso-client';
  constructor() {
  }
  themeSwitch() {
    
    document.documentElement.classList.toggle('dark');
  }
}
