import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { AuthService } from 'src/app/shared/auth/services/auth.service';
import { passwordMatchValidator, regexValidator } from 'src/app/shared/lib/form-validators';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ZorroModule,
    AuthModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            regexValidator(/^.{8,}$/, 'invalidPasswordLength'), // At least 11 characters
            regexValidator(/[a-z]/, 'invalidPasswordLowercase'), // At least one lowercase letter
            regexValidator(/[A-Z]/, 'invalidPasswordUppercase'), // At least one uppercase letter
            regexValidator(/\d/, 'invalidPassworDigit'), // At least one uppercase letter
          ],
        ],
        confirmPassword: ['', Validators.required],
        isActive: [false, Validators.required],
      },
      {
        validators: [passwordMatchValidator('password', 'confirmPassword')],
      }
    );
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    const body = this.form.getRawValue();
    this.authService.signup(body).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['auth/message']);
      }
    });
  }
}
