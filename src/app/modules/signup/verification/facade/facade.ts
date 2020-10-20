import { Injectable } from '@angular/core';
import { SignUpService } from '@app/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UrbanAirshipService } from '@app/core/services/urban-airship.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class SignupEmailVerificationFacade {
  constructor(
    private signupService: SignUpService,
    private router: Router,
    private urbanAirshipService: UrbanAirshipService,
    private readonly analyticsService: AnalyticsService
  ) {}

  createEmailVerificationCode() {
    this.signupService.createEmailVerificationCode().subscribe(resp => {
      this.analyticsService.logEvent(AnalyticsEventTypes.VerificationCodeSent);
    });
  }

  verifyEmailCode(code: string): Observable<any> {
    return this.signupService.verifyEmailCode(code);
  }

  logAnalyticsForWrongCodeError() {
    this.analyticsService.logEvent(AnalyticsEventTypes.EmailVerificationCodeFailed, {
      message: 'User attempted wrong email verification code 3 times'
    });
  }

  emailVerificationSuccess(): void {
    this.urbanAirshipService.registerEmailChannel();
    this.analyticsService.logEvent(AnalyticsEventTypes.EmailVerified);
    this.router.navigate(['signup/log-in-success']);
  }
}
