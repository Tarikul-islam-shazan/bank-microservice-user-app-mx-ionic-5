import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { UIError } from '@app/core/models/error-types';
import { Observable } from 'rxjs';
import * as semanticVersioning from '@env/semantic-versioning.json';
import { MemberService } from '@app/core/services/member.service';
import { UIInfo } from '@app/core/models/loggly-info';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogglyLoggerService {
  private baseUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient,
    private memberService: MemberService,
    private locationStrategy: LocationStrategy
  ) {}
  logError(error: UIError): Observable<any> {
    return this.http.post(`${this.baseUrl}/logger/ui`, error);
  }
  /**
   *
   * Details: getting UI logger using info and log to loggly
   * @param {UIInfo} info
   * @returns {Observable<any>}
   * @memberof LogglyLoggerService
   */
  logUI(info: UIInfo): Observable<any> {
    info = this.addContextLogInfo(info);
    return this.http.post(`${this.baseUrl}/logger/ui`, info);
  }

  addContextLogInfo(info: UIInfo): UIInfo {
    const name = info.name || null;
    const appId = semanticVersioning.appVersion;
    const releaseDate = semanticVersioning.releaseDate;
    const label = environment.label;
    const user = this.memberService.getCachedMember() ? this.memberService.getCachedMember().username : '';
    const deployment = environment.deployment;
    const location = this.locationStrategy;
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const time = new Date().getTime();
    const message = info.message || '';
    return {
      name,
      appId,
      releaseDate,
      label,
      deployment,
      user,
      time,
      url,
      message
    } as UIInfo;
  }
}
