import { Injectable } from '@angular/core';
import { OtpModalState } from './otp-modal.state';
import { Observable } from 'rxjs';

@Injectable()
export class OtpModalFacade {
  constructor(private otpState: OtpModalState) {}

  verifyOtp(otpToken: string): Observable<any> {
    this.otpState.updateOtpCode(otpToken);
    this.otpState.updateOtpVerificationResponse(null);
    return this.otpState.OtpVerificationResponse$;
  }
  // Call this function form your component to get OTP Token
  getOtpCode(): Observable<string> {
    return this.otpState.otpCode$;
  }
  // Call this function form your component to send OTP Verification Response to OTP MODAL
  sendOtpVerificationResponse(response: any) {
    this.otpState.updateOtpVerificationResponse(response);
  }
}
