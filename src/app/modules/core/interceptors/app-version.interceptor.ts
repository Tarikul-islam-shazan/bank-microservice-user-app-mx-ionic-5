/**
 * App version interceptor: App version and device platform added to header interceptor
 * App version and platform information always set to header on every api call
 * @author Sanitul <sanitul@bs-23.com>
 * Date: March 23, 2020
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as semanticVersioning from '@env/semantic-versioning.json';
import { AppPlatform } from '@app/core/util/app-platform';

@Injectable()
export class AppVersionInterceptor implements HttpInterceptor {
  deviceInfoHeader(): { [headerName: string]: string | string[] } {
    return {
      'meedbankingclub-app-version': semanticVersioning.appVersion,
      'meedbankingclub-device-platform': this.appPlatform.currentPlatform()
    };
  }
  constructor(private appPlatform: AppPlatform) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonerequest = req.clone({ setHeaders: this.deviceInfoHeader() });
    return next.handle(clonerequest);
  }
}
