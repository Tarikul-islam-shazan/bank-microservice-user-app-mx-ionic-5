import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOtp } from '../models';
import { noop, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum IHttpRequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete'
}
export interface IOtpVerificationRequest {
  url: string;
  body?: any;
  headers?: HttpHeaders;
  params?: HttpParams;
  requestMethod: IHttpRequestMethod;
}

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private otp: IOtp = {};
  private headers: HttpHeaders;
  private otpVerificationRequest: IOtpVerificationRequest;
  constructor(private http: HttpClient) {}

  getRequestObservable(otpVerificationRequest: IOtpVerificationRequest): Observable<any> {
    switch (otpVerificationRequest.requestMethod) {
      case IHttpRequestMethod.Get:
        return this.http.get(otpVerificationRequest.url, {
          headers: otpVerificationRequest.headers,
          params: otpVerificationRequest.params
        });
      case IHttpRequestMethod.Post:
        return this.http.post(otpVerificationRequest.url, otpVerificationRequest.body, {
          headers: otpVerificationRequest.headers,
          params: otpVerificationRequest.params
        });
      case IHttpRequestMethod.Put:
        return this.http.put(otpVerificationRequest.url, otpVerificationRequest.body, {
          headers: otpVerificationRequest.headers,
          params: otpVerificationRequest.params
        });
      case IHttpRequestMethod.Delete:
        return this.http.delete(otpVerificationRequest.url, {
          headers: otpVerificationRequest.headers,
          params: otpVerificationRequest.params
        });
      case IHttpRequestMethod.Patch:
        return this.http.patch(otpVerificationRequest.url, otpVerificationRequest.body, {
          headers: otpVerificationRequest.headers,
          params: otpVerificationRequest.params
        });
    }
  }

  requestOtpCode(otpVerificationRequest: IOtpVerificationRequest): Observable<any> {
    this.otpVerificationRequest = otpVerificationRequest;
    this.headers = otpVerificationRequest.headers;
    const request: Observable<any> = this.getRequestObservable(this.otpVerificationRequest);
    return request.pipe(
      tap(noop, err => {
        if (err.status === 403) {
          this.otp.otpId = err.headers.get('MeedbankingClub-Otp-Id');
        }
      })
    );
  }

  generateOtpHeaders(otpToken: string) {
    const httpHeaders = {};
    const headers: any = this.otpVerificationRequest.headers || {};
    const normalizedNames: any[] = headers.normalizedNames || [];
    normalizedNames.forEach(name => {
      httpHeaders[name] = headers.get(name);
    });
    httpHeaders['meedbankingclub-otp-id'] = this.otp.otpId;
    httpHeaders['meedbankingclub-otp-token'] = otpToken;
    this.otpVerificationRequest.headers = new HttpHeaders(httpHeaders);
  }

  verifyOtpCode(otpToken: string): Observable<any> {
    this.generateOtpHeaders(otpToken);
    return this.getRequestObservable(this.otpVerificationRequest);
  }

  resendOtpCode() {
    this.otpVerificationRequest.headers = this.headers;
    const request: Observable<any> = this.getRequestObservable(this.otpVerificationRequest);
    request.subscribe(
      resp => {},
      err => {
        if (err.status === 403) {
          this.otp.otpId = err.headers.get('MeedbankingClub-Otp-Id');
        }
      }
    );
  }
}
