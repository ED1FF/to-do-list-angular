import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem("authToken");
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem("authToken") != null;
  }
}
