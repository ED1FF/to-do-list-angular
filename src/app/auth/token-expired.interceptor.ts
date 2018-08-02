import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()

export class TokenExpiredInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.clear();
          this.router.navigate(['/sign_in']);
        }
      }
    });
  }
}
