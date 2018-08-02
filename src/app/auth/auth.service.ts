import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/constants'

@Injectable()
export class AuthService {

  public get getToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  public saveToken(token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  public get isAuthenticated() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) != null;
  }
}
