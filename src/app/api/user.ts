import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserAPI {

  constructor(public http: HttpClient) {}

  signUp(params) {
    return this.http.post(`${environment.api_endpoint}/users`, params);
  }

  signIn(params) {
    return this.http.post(`${environment.api_endpoint}/sessions`, params);
  }

  get() {
    return this.http.get(`${environment.api_endpoint}/users`);
  }

  update(params) {
    return this.http.patch(`${environment.api_endpoint}/users`, params);
  }
}
