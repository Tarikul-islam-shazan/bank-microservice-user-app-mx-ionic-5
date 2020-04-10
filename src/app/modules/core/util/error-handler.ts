// errors-handler.ts
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from '@app/core/services/logger.service';
import { ErrorService } from '@app/core/services/error.service';

const log = new Logger('GlobalErrorHandler');

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: Error | HttpErrorResponse) {
    log.debug('got error');
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      // we do not want to catch this here since this is already done in the interceptor.
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        // Handle Http Error (error.status === 403, 404...)
        // this is also done in interceptor already
      }
    } else {
      log.debug('caught unhandled ui exception', error);
      // Handle Client Error (Angular Error, ReferenceError...)
      const errorService = this.injector.get(ErrorService);
      errorService.sendError(error);
    }
  }
}
