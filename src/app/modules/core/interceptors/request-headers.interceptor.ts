import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import * as semanticVersioning from '@env/semantic-versioning.json';
import { AppPlatform } from '@app/core/util/app-platform';
import { SettingsService } from '@app/core/services/settings.service';
import { environment } from '@env/environment';
@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {
  private correlationId: string;
  constructor(private appPlatform: AppPlatform, private settingsService: SettingsService) {}
  /**
   * create meedbankingclub default request headers object
   *
   * @returns {({ [headerName: string]: string | string[] })}
   * @memberof CorrelationIdInterceptor
   */
  requestHeaders(): { [headerName: string]: string | string[] } {
    // Default headers
    const headers = {} as { [headerName: string]: string | string[] };

    // If bank identifier available then add this to default headers
    if (this.settingsService.getSettings().userSettings.bankIdentifier) {
      Object.assign(headers, {
        'meedbankingclub-bank-identifier': this.settingsService.getSettings().userSettings.bankIdentifier
      });
    } else {
      Object.assign(headers, {
        'meedbankingclub-bank-country': environment.country
      });
    }
    // If correlation is available the add this to default headers
    if (this.correlationId) {
      Object.assign(headers, {
        'meedbankingclub-correlation-id': this.correlationId
      });
    }
    return headers;
  }
  /**
   * send meedbankingclub default request headers on every request
   * set correlationId from from response header from success or error response
   * send that correlationId from next request header
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof CorrelationIdInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonerequest = request.clone({ setHeaders: this.requestHeaders() });
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
        return throwError(error);
      })
    );
  }
}
