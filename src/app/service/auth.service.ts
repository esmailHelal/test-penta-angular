import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;
  constructor() {}

  login(token: any) {
    localStorage.setItem('token_test', token);
    this.isAuth = true;
  }

  checkUserAuth() {
    if (localStorage.getItem('token_test')) {
      this.isAuth = true;
    }
  }

  signOut() {
    localStorage.removeItem('token_test');
    this.isAuth = false;
  }

  getToken() {
    return localStorage.getItem('token_test');
  }

  isUserAuth() {
    return this.isAuth;
  }
}
