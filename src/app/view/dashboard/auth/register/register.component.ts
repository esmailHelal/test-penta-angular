import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide1 = true;
  loadingsingleprodc = false;
  valid = false;
  invalid = false;
  message = 'Please Complete the form';
  SearchCountryField = [SearchCountryField.DialCode, SearchCountryField.Name];
  arr = [SearchCountryField.Iso2, SearchCountryField.Name];
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Egypt];
  windowRef: any;
  disableSignUpBtn = true;
  constructor(
    public apiservice: ApiServiceService,
    private _router: Router,
    public _auth: AuthService,
    
  ) {}

  ngOnInit(): void {
    this.windowRef = this.apiservice.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1', {
       'size': 'normal', callback: (response:any) => {
         this.disableSignUpBtn = false;
      },'expired-callback': () => {
        this.disableSignUpBtn = true;
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }
  register(myForm: any) {
    if (myForm.status != 'INVALID' &&  !this.disableSignUpBtn) {
      this.loadingsingleprodc = true;
      this.apiservice.SignUp(myForm.value.email, myForm.value.password).then(res => {
        res.user?.getIdToken().then(res => {
          this.apiservice.token = res;
        });
        this.loadingsingleprodc = false;
        let appVerifier = this.windowRef.recaptchaVerifier;
        Object.assign(res.user, {
          phone: myForm.value.phone.e164Number,
        });
        this.apiservice.SetUserData(res.user);
       this.apiservice.afAuth.signInWithPhoneNumber(myForm.value.phone.e164Number,appVerifier).then(res => {
         this.windowRef.confirmationResult = res;
         this._router.navigateByUrl('/dashboard/auth/coderesend');
       }).catch(err => {       
          this.message = err;
          this.invalid = true;
          this.loadingsingleprodc = true;
          $('#popup').modal('show');
          setTimeout(() => {
            $('#popup').modal('hide');
            this.loadingsingleprodc = false;
            this.invalid = false;
          }, 3000);
         })
      }).catch(err => {
        this.message = err;
        this.invalid = true;
        this.loadingsingleprodc = true;

        $('#popup').modal('show');

        setTimeout(() => {
          $('#popup').modal('hide');

          this.loadingsingleprodc = false;
          this.invalid = false;
        }, 3000);
       })
     
           
    } else {
      this.invalid = true;
      this.loadingsingleprodc = true;

      $('#popup').modal('show');

      setTimeout(() => {
        $('#popup').modal('hide');

        this.loadingsingleprodc = false;
        this.invalid = false;
      }, 3000);
    }
  }
}
