import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserAPI {

  constructor(public http: HttpClient) {}

  create(params) {
    return this.http.post(`${environment.api_endpoint}/users`, params);
  }

  get() {
    return this.http.get(`${environment.api_endpoint}/users`);
  }

  update(params) {
    return this.http.patch(`${environment.api_endpoint}/users`, params);
  }
}
