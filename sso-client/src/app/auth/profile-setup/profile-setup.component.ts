import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [ZorroModule, ReactiveFormsModule],
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.scss',
})
export class ProfileSetupComponent {
  form!: FormGroup;
  fb = inject(FormBuilder);
  constructor(){
    this.form = this.fb.group({
      roleType: [null, Validators.required],
      address: ['', Validators.required],
      age: ['', Validators.required],
      birthday: ['', Validators.required],
      contact: ['', Validators.required],
      gender: ['', Validators.required],
      photo: [''],
    });
  }
  onSubmit(){
    console.log(this.form.getRawValue())
  }
}
