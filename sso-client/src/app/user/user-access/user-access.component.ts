import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { catchError, first, firstValueFrom, map, Observable, Subject, switchMap } from 'rxjs';
import { Access, AccessObject, Role } from 'src/app/shared/models/access';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorResponseResult } from 'src/app/shared/models/respone';
import { HotToastService } from '@ngxpert/hot-toast';
import { ApiError } from 'src/app/shared/models/api-error';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleType } from 'src/app/shared/models/role-type';

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
  roleTypes$!: Observable<RoleType[]>;
  accessList!: Access[];
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
      rolePosition: this.fb.control(null),
      accessList: this.fb.array([]),
    });

    this.setAllRole();
    this.setAccessObject();
    this.setUserProfile();
    this.$accessByUserId
      .pipe(
        switchMap((id) => this.userService.getAccessByUserid(id)),
        map((res) => res.result)
      )
      .subscribe((res) => {
        this.accessList = res!;
        this.accessListControl.clear();
        for (const i of this.accessList) {
          this.accessListControl.push(
            this.fb.group({
              id: [i.id],
              object: [i.object.id, Validators.required],
              role: [i.role.id, Validators.required],
            })
          );
        }
      });
    this.$accessByUserId = this.id;
    this.roleTypes$ = this.userService
      .getAllRoleTypes()
      .pipe(map((res) => res.result || []));
  }
  async updateRolePosition() {
    const roleId = this.rolePositionControl?.getRawValue();
    const roles = await firstValueFrom(this.roleTypes$);
    const role = roles.find((item) => item.id === roleId);
    const patient = this.getAccessObject.find((i) => i.name === 'patient');
    const editor = this.getAllRole.find((i) => i.name === 'editor');
    const guest = this.getAllRole.find((i) => i.name === 'guest');
    const hasPatient = this.accessList.find((i) => i.object.id === patient?.id);

    if (!role) {
      // Handle case where role is not found
      return;
    }

    const roleMappings: Record<
      string,
      { accessId: string; newRoleId: string }
    > = {
      doctor: {
        accessId: editor?.id as string,
        newRoleId: editor?.id as string,
      },
      patient: {
        accessId: guest?.id as string,
        newRoleId: guest?.id as string,
      },
    };
    const roleMapping = roleMappings[role.name];
    this.userService
      .setRolePositionToUser(this.id, role)
      .pipe(
        first(),
        catchError((res: HttpErrorResponse) => {
          this.toast.error(res.error.message);
          throw res;
        })
      )
      .subscribe((res) => {
        // console.log(res);
      });
    if (!roleMapping) {
      // Handle case where role name is not mapped
      return;
    }
    const accessOperation$ = hasPatient
      ? this.userService.updateAccess(
          this.id,
          hasPatient.id,
          hasPatient.object.id as string,
          roleMapping?.accessId as string
        )
      : this.userService.postCreateAccess(
          this.id,
          patient?.id as string,
          roleMapping?.newRoleId as string
        );

    accessOperation$
      .pipe(
        first(),
        catchError((res: HttpErrorResponse) => {
          this.toast.error(res.error.message);
          throw res;
        })
      )
      .subscribe(() => {
        this.$accessByUserId = this.id;
      });
  }

  get accessListControl() {
    return this.form.get('accessList') as FormArray;
  }
  get rolePositionControl() {
    return this.form.get('rolePosition');
  }
  async setUserProfile() {
    try {
      const res = await firstValueFrom(this.userService.getUserById(this.id));
      const roleType = res.result?.profile?.roleType;
      if (roleType) {
        this.rolePositionControl?.setValue(roleType.id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Optionally, handle the error, e.g., show a toast notification
    }
  }
  async setAllRole() {
    try {
      const res = await firstValueFrom(this.userService.getAllRole());
      this.getAllRole = res.result as Role[];
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Optionally, handle the error, e.g., show a toast notification
    }
  }
  async setAccessObject() {
    try {
      const res = await firstValueFrom(this.userService.getAccessObject());
      this.getAccessObject = res.result as AccessObject[];
    } catch (error) {
      console.error('Error fetching access objects:', error);
      // Optionally, handle the error, e.g., show a toast notification
    }
  }
  addNewAccess() {
    this.accessListControl.push(
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
