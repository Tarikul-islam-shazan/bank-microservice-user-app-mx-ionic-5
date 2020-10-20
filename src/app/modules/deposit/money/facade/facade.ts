import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class DirectDepositMoney {
  constructor(
    private router: Router,
    private signupService: SignUpService,
    private readonly analyticsService: AnalyticsService
  ) {}

  moveOn(registrationFeePaymentType: string) {
    this.signupService.signUpDirectDepositAccounts.registrationFeePaymentType = registrationFeePaymentType;
    this.analyticsService.logEvent(AnalyticsEventTypes.DepositMethodSelected, { type: registrationFeePaymentType });
    this.router.navigate(['signup/deposit/e-check']);
  }
}
