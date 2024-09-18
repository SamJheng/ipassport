import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { AuthService } from 'src/app/shared/auth/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [ZorroModule, ReactiveFormsModule, AuthModule],
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.scss',
})
export class ProfileSetupComponent {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  user!: User;
  constructor() {
    this.form = this.fb.group({
      roleType: [null, Validators.required],
      address: ['', Validators.required],
      age: ['', Validators.required],
      birthday: ['', Validators.required],
      contact: ['', Validators.required],
      gender: ['', Validators.required],
      photo: [''],
    });
    this.authService
      .getProfile()
      .pipe(map((res) => res.result))
      .subscribe((res) => {
        this.user = res!;
      });
    this.authService
      .getAllRoleTypes()
      .pipe(map((res) => res.result))
      .subscribe((res) => {
        const patient = res?.find((i) => i.name === 'patient');
        this.roleTypeControl?.setValue(patient);
      });
  }
  get roleTypeControl() {
    return this.form.get('roleType');
  }
  onSubmit() {
    const profile = this.form.getRawValue();
    this.user.profile = profile;
    if (this.form.invalid) {
      return;
    }
    // console.log(this.user)
    this.authService.updateProfile(this.user).subscribe((res) => {
      this.router.navigate(['dashborard']);
    });
  }
}
