import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/constants'

@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  public saveToken(token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) != null;
  }
}
