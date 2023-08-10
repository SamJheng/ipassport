import { GoogleOnetapService } from './../../../shared/auth/google/google-onetap.service';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {
  userDetails:any;
  constructor(
    private oneTap: GoogleOnetapService,
    private authService: AuthService) {
    this.authService.singin('Joey_Satterfield-Johnston64@hotmail.com','password').subscribe(console.log)
    }

  ngOnInit() {
    /** Initialize OneTap, While initialing you can pass config  like this.oneTap.tapInitialize(config) here config is optional. **/
    this.oneTap.tapInitialize();

    /** Subscribe the Tap Moment. following response options all have self explanatory.
     *  If you want more info please refer at bottom of the document attached link. **/
    this.oneTap.promtMoment.subscribe(res => {
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
    this.oneTap.oneTapCredentialResponse.subscribe(res => {
      /**  Response
       * clientId: your client ID,
       * client_id: your client ID,
       * credential: The credential/secret key is utilized for user validation and information retrieval. Validation can be performed on the backend server/platform using the appropriate Google library. Please refer to the backend implementation details at the bottom of the document
       **/
      console.log(res);
      this.authService.googleIdtokenVerify(res.credential).subscribe(console.log)
    });

    /** Authentication validation can be performed using the Google OAuth2 APIs, eliminating the need for client_id validation on the backend and the retrieval of user details **/
    this.oneTap.authUserResponse.subscribe(res => {
      this.userDetails = res;
      console.log(this.userDetails)
    });

  }

  tapCancel() {
    this.oneTap.cancelTheTap();
  }
}
