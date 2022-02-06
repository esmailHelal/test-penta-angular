import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanActiveRegisterGuard implements CanActivate {
  constructor(public _auth: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._auth.isUserAuth()) {
      this.router.navigateByUrl('/dashboard/ad');

      return false;
    } else {
      return true;
    }
  }
}
