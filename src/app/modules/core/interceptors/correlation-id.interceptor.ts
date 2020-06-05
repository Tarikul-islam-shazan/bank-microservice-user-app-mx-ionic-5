import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CorrelationIdInterceptor implements HttpInterceptor {
  private correlationId: string;

  /**
   * send correlation id in header if we get correlation id from response
   *
   * @returns {({ [headerName: string]: string | string[] })}
   * @memberof CorrelationIdInterceptor
   */
  correlationIdHeader(): { [headerName: string]: string | string[] } {
    if (this.correlationId) {
      return {
        'meedbankingclub-correlation-id': this.correlationId
      };
    }
  }
  /**
   * set correlationId from from response header from success or error response
   * send that correlationId from next request header
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof CorrelationIdInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonerequest = request.clone({ setHeaders: this.correlationIdHeader() });
    return next.handle(clonerequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.correlationId = event.headers.get('meedbankingclub-correlation-id');
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          this.correlationId = error.headers.get('meedbankingclub-correlation-id');
        }
        return of(error);
      })
    );
  }
}
