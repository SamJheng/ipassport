import { AfterViewInit, Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile, User } from 'src/app/shared/models/user';
import { first } from 'rxjs';

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
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isActive: [false, Validators.required],
      profile: this.fb.group({
        gender: ['', Validators.required],
        photo: ['', Validators.required],
        birthday: ['', Validators.required],
      }),
    });
  }
  ngOnInit(): void {
    this.userService
      .getUserById(this.id)
      .pipe(first())
      .subscribe((res) => {
        if (!res.success) {
          return;
        }
        const { email, firstName, lastName, isActive, username } =
          res.result as User;
        this.usernameControl?.setValue(username);
        this.emailControl?.setValue(email);
        this.firstnameControl?.setValue(firstName);
        this.lastnameControl?.setValue(lastName);
        this.activeControl?.setValue(isActive);
        if (res.result?.profile) {
          const { gender, photo, birthday } = res.result?.profile as Profile;
          this.genderControl?.setValue(gender);
          this.photoControl?.setValue(photo);
          this.birthdayControl?.setValue(birthday);
        }
      });
  }
  ngAfterViewInit(): void {}
  get usernameControl() {
    return this.form.get('username');
  }
  get emailControl() {
    return this.form.get('email');
  }
  get firstnameControl() {
    return this.form.get('firstName');
  }
  get lastnameControl() {
    return this.form.get('lastName');
  }
  get activeControl() {
    return this.form.get('isActive');
  }
  get genderControl() {
    return this.form.get('profile.gender');
  }
  get photoControl() {
    return this.form.get('profile.photo');
  }
  get birthdayControl() {
    return this.form.get('profile.birthday');
  }
  sumbitForm() {
    const body = this.form.getRawValue();
    this.userService.putEditUserById(this.id, body).subscribe((res) => {
      console.log(res);
    });
  }
}
