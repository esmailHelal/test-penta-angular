import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import firebase from 'firebase/app';
import 'firebase/auth';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loadingsingleprodc = false;
  valid = false;
  invalid = false;
  message = '';
  invaild_error = false;
  windowRef: any;
  disableSignUpBtn = true;
  constructor(
    public apiservice: ApiServiceService,
    private _router: Router,
    public _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.windowRef = this.apiservice.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response: any) => {
          this.disableSignUpBtn = false;
        },
        'expired-callback': () => {
          this.disableSignUpBtn = true;
        },
      }
    );
    this.windowRef.recaptchaVerifier.render();
  }
  login(myForm: any) {
    if (myForm.status != 'INVALID' && !this.disableSignUpBtn) {
      this.loadingsingleprodc = true;
      this.apiservice
        .SignIn(myForm.value.email, myForm.value.password)
        .then((res) => {
          res.user?.getIdToken().then((res) => {
            this.apiservice.token = res;
          });
          this.loadingsingleprodc = false;
          let appVerifier = this.windowRef.recaptchaVerifier;
          this.apiservice.GettUserData(res.user).subscribe((res) => {
            this.apiservice.afAuth
              .signInWithPhoneNumber(res.data().phoneNumber, appVerifier)
              .then((res) => {
                this.windowRef.confirmationResult = res;
                this._router.navigateByUrl('/dashboard/auth/coderesend');
              })
              .catch((err) => {
                this.message = err;
                this.invalid = true;
                this.loadingsingleprodc = true;
                $('#popup').modal('show');
                setTimeout(() => {
                  $('#popup').modal('hide');
                  this.loadingsingleprodc = false;
                  this.invalid = false;
                }, 3000);
              });
          });
        })
        .catch((err) => {
          this.message = err;
          this.invalid = true;
          this.loadingsingleprodc = true;
          $('#popup').modal('show');
          setTimeout(() => {
            $('#popup').modal('hide');
            this.loadingsingleprodc = false;
            this.invalid = false;
          }, 3000);
        });
    } else {
      
      this.invalid = true;
      this.loadingsingleprodc = true;
      this.invaild_error = false;
      $('#popup').modal('show');

      setTimeout(() => {
        $('#popup').modal('hide');

        this.loadingsingleprodc = false;
        this.invalid = false;
      }, 3000);
    }
  }
}
