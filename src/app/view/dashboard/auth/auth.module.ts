import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MustMatchDirective } from './must-match.directive';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { CodeResendComponent } from './code-resend/code-resend.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    CodeResendComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NgxIntlTelInputModule,
    CountdownModule,
 
  ],
  providers: [
   
  ],
})
export class AuthModule {}
