import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '@app/core/services/logger.service';
import { ErrorService } from '../services/error.service';
const log = new Logger('ErrorInterceptor');
/**
 * Adds a default error handler to all HTTP requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    // this will log the error to the console only, we do not need to send the error to backend providers
    // since http errors will already be logged by backend.
    log.error(error);
    this.errorService.handleApiError(error);
    return throwError(error);
  }
}
