import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    ZorroModule,
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {}
