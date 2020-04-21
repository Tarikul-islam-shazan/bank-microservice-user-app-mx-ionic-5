import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  JumioApiService,
  SignUpService,
  StaticDataService,
  StaticDataCategory,
  StaticDataSubCategory
} from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { IBeneficiaryInfo } from '@app/core/models/dto/signup';
import { Observable } from 'rxjs';

@Injectable()
export class BeneficiaryFacade {
  relationship: any;
  constructor(
    private router: Router,
    private jumioService: JumioApiService,
    private signUpService: SignUpService,
    private analytics: AnalyticsService,
    private staticDataService: StaticDataService
  ) {}

  fetchRelationshipData(): Observable<{ [key: string]: { value: string; text: string } }> {
    return this.staticDataService.get(StaticDataCategory.SignupOption, [StaticDataSubCategory.Relationship]);
  }

  submit(beneficiary: Partial<IBeneficiaryInfo>) {
    // console.log(beneficiary);
    // this.analytics.logEvent(AnalyticsEventTypes.GeneralInfoSubmitted);
    // [routerLink]="['/signup/account-selection']"
    this.signUpService.submitBeneficiaryApplication(beneficiary).subscribe(resp => {
      // console.log(resp);
      // this.analytics.logEvent(AnalyticsEventTypes.IdDocumentSubmitted);
      this.router.navigateByUrl('/signup/account-selection');
    });
  }
}
