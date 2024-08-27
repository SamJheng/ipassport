import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { first, map, Observable } from 'rxjs';
import { AccessObject, Role } from 'src/app/shared/models/access';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-access',
  standalone: true,
  imports: [ZorroModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.scss',
})
export class UserAccessComponent {
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  getAllRole!: Role[];
  getAccessObject!: AccessObject[];
  id!: string;
  form!: FormGroup;
  private fb = inject(FormBuilder);
  constructor() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // this.form = this.fb.array([]);
    this.form = this.fb.group({
      accessList: this.fb.array([]),
    });

    this.setAllRole();
    this.setAccessObject();
    this.userService
      .getAccessByUserid(this.id)
      .pipe(map((res) => res.result))
      .subscribe((res) => {
        for (const i of res) {
          this.accessList.push(
            this.fb.group({
              id:[i.id],
              object: [i.object.id, Validators.required],
              role: [i.role.id, Validators.required],
            })
          );
        }

        console.log(this.form);
      });
  }
  get accessList() {
    return this.form.get('accessList') as FormArray;
  }
  setAllRole() {
    this.userService
      .getAllRole()
      .pipe(
        first(),
        map((res) => res.result)
      )
      .subscribe((res) => (this.getAllRole = res as Role[]));
  }
  setAccessObject() {
    this.userService
      .getAccessObject()
      .pipe(
        first(),
        map((res) => res.result)
      )
      .subscribe((res) => (this.getAccessObject = res as AccessObject[]));
  }
  addNewAccess(){
    this.accessList.push(
      this.fb.group({
        object: [null, Validators.required],
        role: [null, Validators.required],
      })
    );
  }
  submit(){
    console.log(this.accessList.getRawValue())
  }
}
