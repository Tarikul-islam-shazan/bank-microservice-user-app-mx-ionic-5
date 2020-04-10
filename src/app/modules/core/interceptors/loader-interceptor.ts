import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { Logger } from '../services/logger.service';

const log = new Logger('LoadingInterceptor');
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    log.info('start');
    return from(this.loadingService.show({ loadingMessage: 'Please wait...' })).pipe(
      switchMap((loading: HTMLIonLoadingElement) => {
        return next.handle(req).pipe(
          finalize(() => {
            this.loadingService.dismiss();
          })
        );
      })
    );
  }
}
