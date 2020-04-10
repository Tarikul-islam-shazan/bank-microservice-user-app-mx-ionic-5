import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, JumioApiService, IMemberApplication, BankApplication, IScannedIdData } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class SignupIdentityConfirmFacade {
  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private jumioService: JumioApiService,
    private analytics: AnalyticsService
  ) {}

  applyForBank(memberApp: IMemberApplication) {
    memberApp.email = this.signUpService.member.email;
    Object.assign(this.signUpService.memberApplication, memberApp);
    const bankApplication: BankApplication = {
      memberApplication: this.signUpService.memberApplication,
      scannedIdData: this.jumioService.scannedIdData
    };
    this.signUpService.ApplyForBankAccount(bankApplication).subscribe(resp => {
      if (resp.customerId) {
        this.analytics.logEvent(AnalyticsEventTypes.IdDocumentSubmitted);
        this.router.navigate(['/signup/terms-conditions']);
      }
      if (resp.questions) {
        // GMA-4681; Muntaqeem; questions value coming back from backend is being saved on signupService
        this.signUpService.identityQuestions = resp.questions;
        this.router.navigate(['/signup/identity-verification']);
      }
    });
  }

  getJumioScanData(): IScannedIdData {
    return this.jumioService.scannedIdData;
  }
}
