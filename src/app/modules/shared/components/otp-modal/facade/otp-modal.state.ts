import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class OtpModalState {
  private _otpCode: Subject<string> = new Subject();
  otpCode$: Observable<string> = this._otpCode.asObservable();
  private _OtpVerificationResponse: Subject<any> = new Subject();
  OtpVerificationResponse$: Observable<boolean> = this._OtpVerificationResponse.asObservable();

  constructor() {}

  updateOtpCode(code: string) {
    this._otpCode.next(code);
  }

  updateOtpVerificationResponse(response: any) {
    this._OtpVerificationResponse.next(response);
  }
}
