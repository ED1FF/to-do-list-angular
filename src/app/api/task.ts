import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TaskAPI {

  constructor(public http: HttpClient) {}

  query() {
    return this.http.get(`${environment.api_endpoint}/tasks`);
  }

  create(params) {
    return this.http.post(`${environment.api_endpoint}/tasks`, params);
  }

  update(id, params) {
    return this.http.patch(`${environment.api_endpoint}/tasks/${id}`, params);
  }

  delete(id) {
    return this.http.delete(`${environment.api_endpoint}/tasks/${id}`);
  }

  get(id) {
    return this.http.get(`${environment.api_endpoint}/tasks/${id}`);
  }
}
