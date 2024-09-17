import { Component, OnInit } from '@angular/core';
import { ZorroModule } from '../../shared/ng-zorro-antd.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth/services/auth.service';
import { AuthModule } from '../../shared/auth/auth.module';
import { GoogleOnetapService } from '../../shared/auth/google/google-onetap.service';
import { switchMap } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ZorroModule,
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private oneTap = inject(GoogleOnetapService);
  private router = inject(Router);
  form!: FormGroup;
  isShowPassword: boolean = false;
  constructor() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  openOneTap() {
    this.oneTap.tapInitialize();
  }
  ngOnInit(): void {
    this.openOneTap();
    /** Subscribe the Tap Moment. following response options all have self explanatory.
     *  If you want more info please refer at bottom of the document attached link. **/
    this.oneTap.promtMoment.subscribe((res) => {
      res.getDismissedReason();
      res.getMomentType();
      res.getNotDisplayedReason();
      res.getSkippedReason();
      res.isDismissedMoment();
      res.isDisplayed();
      res.isNotDisplayed();
      res.isSkippedMoment();
    });
    /** The JWT credentials will be returned as a response after completing the one tap process.  **/
    this.oneTap.oneTapCredentialResponse
      .pipe(
        /**  Response
         * clientId: your client ID,
         * client_id: your client ID,
         * credential: The credential/secret key is utilized for user validation and information retrieval. Validation can be performed on the backend server/platform using the appropriate Google library. Please refer to the backend implementation details at the bottom of the document
         **/
        switchMap((res) => this.authService.googleIdtokenVerify(res.credential))
      )
      .subscribe((res) => {
        if (res.success) {
          this.loginSueccess();
        }
      });
  }
  ngAfterViewInit(): void {}

  submit() {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.authService.singin(email, password).subscribe((res) => {
      if (res.success) {
        this.loginSueccess();
      }
    });
  }
  toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
  loginSueccess() {
    this.router.navigate(['redirect']);
  }
}
