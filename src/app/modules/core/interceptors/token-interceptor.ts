import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * Disable cookies request and response
     * Ticket: GMA-4692
     * @summary cookies is set by backend server, we can not get or set cookies from client end.
     * Some of the case we do not need to send cookies to server [signup deposit, registration-fee]
     * Date: March 11, 2020
     */
    const withCredentials = req.headers.has('disabled-cookies') ? false : true;
    const clonerequest = req.clone({ withCredentials });
    return next.handle(clonerequest);
  }
}
