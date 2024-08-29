import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { catchError, first, map, Observable, Subject, switchMap } from 'rxjs';
import { AccessObject, Role } from 'src/app/shared/models/access';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorResponseResult } from 'src/app/shared/models/respone';
import { HotToastService } from '@ngxpert/hot-toast';
import { ApiError } from 'src/app/shared/models/api-error';
import { HttpErrorResponse } from '@angular/common/http';

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
  private _accessByUserId = new Subject<string>();
  private toast = inject(HotToastService);
  set $accessByUserId(id: string) {
    this._accessByUserId.next(id);
  }
  get $accessByUserId(): Observable<string> {
    return this._accessByUserId.asObservable();
  }

  constructor() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // this.form = this.fb.array([]);
    this.form = this.fb.group({
      accessList: this.fb.array([]),
      objectName: this.fb.control(''),
    });

    this.setAllRole();
    this.setAccessObject();
    this.$accessByUserId
      .pipe(
        switchMap((id) => this.userService.getAccessByUserid(id)),
        map((res) => res.result)
      )
      .subscribe((res) => {
        this.accessList.clear();
        for (const i of res) {
          this.accessList.push(
            this.fb.group({
              id: [i.id],
              object: [i.object.id, Validators.required],
              role: [i.role.id, Validators.required],
            })
          );
        }
      });
    this.$accessByUserId = this.id;
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
  addNewAccess() {
    this.accessList.push(
      this.fb.group({
        object: [null, Validators.required],
        role: [null, Validators.required],
      })
    );
  }
  addNewAccessObject(name: string) {
    this.userService.postAccessObjectByName(name).subscribe((res) => {
      if (res.success) {
        this.setAccessObject();
      }
    });
  }
  submit() {
    console.log(this.accessList.getRawValue());
  }
  deleteAccess(form: AbstractControl) {
    const id = form.get('id')?.getRawValue();
    if (!id) {
      return;
    }
    this.userService.deleteAccess(id).subscribe((res) => {
      this.$accessByUserId = this.id;
    });
  }
  createAccess(form: AbstractControl) {
    const object: string = form.get('object')?.getRawValue();
    const role: string = form.get('role')?.getRawValue();
    if (!role && !object) {
      return;
    }
    this.userService
      .postCreateAccess(this.id, object, role)
      .pipe(
        catchError((res: HttpErrorResponse) => {
          this.toast.error(res.error.message);
          throw res;
        })
      )
      .subscribe((res) => {
        this.$accessByUserId = this.id;
      });
  }
  updateAccess(form: AbstractControl) {
    const id: string = form.get('id')?.getRawValue();
    const object: string = form.get('object')?.getRawValue();
    const role: string = form.get('role')?.getRawValue();
    if (!role && !object && !id) {
      return;
    }
    this.userService
      .updateAccess(this.id, id, object, role)
      .subscribe((res) => {
        this.$accessByUserId = this.id;
      });
  }
}
