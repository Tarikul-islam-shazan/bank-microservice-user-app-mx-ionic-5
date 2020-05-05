import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { Logger } from '../services/logger.service';

const log = new Logger('LoadingInterceptor');
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loadingService: LoadingService) {}

  /**
   * This Interceptor responsible for showing loading for each httprequest
   * But this loading not showing when we get extra header skip-loader within a headers
   * Issue: MM2-237
   * Details: typing interrupted by "Please wait" pop up.
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof LoaderInterceptor
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    log.info('start');
    if (req.headers.has('skip-loader')) {
      const newHeaders = req.headers.delete('skip-loader');
      const newRequest = req.clone({ headers: newHeaders });
      return next.handle(newRequest);
    } else {
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
}
