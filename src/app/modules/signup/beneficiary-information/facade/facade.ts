import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JumioApiService, SignUpService } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { IBeneficiaryInfo } from '@app/core/models/dto/signup';

@Injectable()
export class BeneficiaryFacade {
  constructor(
    private router: Router,
    private jumioService: JumioApiService,
    private signUpService: SignUpService,
    private analytics: AnalyticsService
  ) {}

  submit(beneficiary: IBeneficiaryInfo) {
    // this.analytics.logEvent(AnalyticsEventTypes.GeneralInfoSubmitted);
    // [routerLink]="['/signup/account-selection']"
    this.signUpService.submitBeneficiaryApplication(beneficiary).subscribe(resp => {
      console.log(resp);
      // this.analytics.logEvent(AnalyticsEventTypes.IdDocumentSubmitted);
      this.router.navigate(['/signup/account-selection']);
    });
  }
}
