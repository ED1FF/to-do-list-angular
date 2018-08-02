import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/constants';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  constructor(public router: Router) {}

  public get getToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  public saveToken(token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  public signOut(){
    localStorage.clear();
    this.router.navigate(['/sign_in']);
  }

  public get isAuthenticated() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) != null;
  }
}
