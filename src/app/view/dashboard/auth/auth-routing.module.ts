import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveRegisterGuard } from 'src/app/guards/can-active-register.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CodeResendComponent } from './code-resend/code-resend.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CanActiveRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CanActiveRegisterGuard],
  },
  {
    path: 'coderesend',
    component: CodeResendComponent,
    canActivate: [CanActiveRegisterGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
