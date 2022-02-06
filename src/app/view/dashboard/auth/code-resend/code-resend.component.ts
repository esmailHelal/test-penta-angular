import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
declare var $: any;
@Component({
  selector: 'app-code-resend',
  templateUrl: './code-resend.component.html',
  styleUrls: ['./code-resend.component.scss'],
})
export class CodeResendComponent implements OnInit {
  loadingsingleprodc = false;
  valid = false;
  invalid = false;
  windowRef: any;
  separateDialCode = true;
  verify = false;
  message = '';
  constructor(
    public apiservice: ApiServiceService,
    private _router: Router,
    public _auth: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.apiservice.token) {
     
      this._router.navigateByUrl('/dashboard/auth');
    } 
  }

  sendcode(myForm: any) {
    if (myForm.status != 'INVALID') {
      this.loadingsingleprodc = true;
      this.windowRef = this.apiservice.windowRef;
      this.windowRef.confirmationResult.confirm(myForm.value.code).then((result: any) => {
        // User signed in successfully.
        this._auth.login(this.apiservice.token);
        this._auth.checkUserAuth();
        this.loadingsingleprodc = false;
        this._router.navigateByUrl('/dashboard/ad');
      }).catch((error: any) => {
        this.invalid = true;
        this.loadingsingleprodc = true;

        $('#popup').modal('show');

        setTimeout(() => {
          $('#popup').modal('hide');

          this.loadingsingleprodc = false;
          this.invalid = false;
        }, 3000);
      });
    }else {
      
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
