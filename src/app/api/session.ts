import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SessionAPI {

  constructor(public http: HttpClient) {}

  create(params) {
    return this.http.post(`${environment.api_endpoint}/sessions`, params);
  }
}
