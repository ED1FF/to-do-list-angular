import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BulkTasksAPI {

  constructor(public http: HttpClient) {}

  update(params) {
    return this.http.patch(`${environment.api_endpoint}/bulk_tasks`, params);
  }

  delete(params) {
    return this.http.delete(`${environment.api_endpoint}/bulk_tasks`, {params: params});
  }
}
