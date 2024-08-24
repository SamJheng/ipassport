import { AfterViewInit, Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Profile, User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ZorroModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, AfterViewInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  id!: string;
  constructor() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      active: [false],
      profile: this.fb.group({
        gender: [''],
        photo: [''],
      }),
    });
  }
  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe((res) => {
      if (!res.success) {
        return;
      }
      const { email, firstName, lastName, isActive } = res.result as User;
      
      this.emailControl?.setValue(email);
      this.firstnameControl?.setValue(firstName);
      this.lastnameControl?.setValue(lastName);
      this.activeControl?.setValue(isActive);
      if (res.result?.profile) {
        console.log(res.result?.profile);
        const { gender, photo } = res.result?.profile as Profile;
        this.genderControl?.setValue(gender);
        this.photoControl?.setValue(photo);
      }
      
      console.log(this.genderControl);
    });
  }
  ngAfterViewInit(): void {}
  get emailControl() {
    return this.form.get('email');
  }
  get firstnameControl() {
    return this.form.get('firstname');
  }
  get lastnameControl() {
    return this.form.get('lastname');
  }
  get activeControl() {
    return this.form.get('active');
  }
  get genderControl() {
    return this.form.get('profile.gender');
  }
  get photoControl() {
    return this.form.get('profile.photo');
  }
}
