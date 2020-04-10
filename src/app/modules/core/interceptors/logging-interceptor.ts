import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

import { Logger } from '../services/index';

const log = new Logger('LoggingInterceptor');

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    let resBody = {};

    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
          if (event instanceof HttpResponse && event.body) {
            // dont need to log directly now we can save the body and
            // log it in finalize
            // log.debug(event.body);
            resBody = event.body;
          }
        },
        // Operation failed; error is an HttpErrorResponse
        error => (ok = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        log.debug(msg, resBody);
        // if (res.body) {
        //   log.debug(res.body);
        // }
      })
    );
  }
}
