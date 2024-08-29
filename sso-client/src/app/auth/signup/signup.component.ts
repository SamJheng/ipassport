import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError } from 'rxjs';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { AuthService } from 'src/app/shared/auth/services/auth.service';
import { passwordMatchValidator, regexValidator } from 'src/app/shared/lib/form-validators';
import { ErrorResponseResult } from 'src/app/shared/models/respone';
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
  private toast = inject(HotToastService);
  isShowPassword: boolean = false;
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
            regexValidator(/\d/, 'invalidPassworDigit'), // At least one number letter
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
  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }
  submit() {
    if (this.form.invalid) {
      if (this.passwordControl?.getError('invalidPasswordLength')) {
        this.toast.error('Password min length must be 8');
      }
      if (this.passwordControl?.getError('invalidPasswordLowercase')) {
        this.toast.error('Password must be have a lowercase');
      }
      if (this.passwordControl?.getError('invalidPasswordUppercase')) {
        this.toast.error('Password must be have a uppercase');
      }
      if (this.passwordControl?.getError('invalidPassworDigit')) {
        this.toast.error('Password must be have a number');
      }
      if (this.emailControl?.getError('email')) {
        this.toast.error('Email is invalid');
      }
      if (this.form.getError('mismatch')) {
        this.toast.error('Password must be match Confirm Password');
      }
      return;
    }
    const body = this.form.getRawValue();

    this.authService
      .signup(body)
      .pipe(
        catchError((res: HttpErrorResponse) => {
          this.toast.error(res.error.message);
          throw res;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.router.navigate(['auth/message']);
        }
      });
  }
  toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
