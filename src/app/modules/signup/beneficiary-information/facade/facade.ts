import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  JumioApiService,
  SignUpService,
  StaticDataService,
  StaticDataCategory,
  StaticDataSubCategory,
  IDropdownOption
} from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { IBeneficiaryInfo } from '@app/core/models/dto/signup';
import { Observable } from 'rxjs';
import { DropdownOption } from '@app/signup/models/signup';

@Injectable()
export class BeneficiaryFacade {
  relationshipData: DropdownOption[];
  constructor(
    private router: Router,
    private jumioService: JumioApiService,
    private signUpService: SignUpService,
    private analytics: AnalyticsService,
    private staticDataService: StaticDataService
  ) {}

  fetchRelationshipData() {
    return this.staticDataService
      .get(StaticDataCategory.SignupOption, [StaticDataSubCategory.Relationship])
      .subscribe(resp => {
        this.relationshipData = [];
        resp.Relationship.forEach(data => {
          this.relationshipData.push({
            value: data.value,
            text: data.text
          });
        });
      });
  }

  submit(beneficiary: Partial<IBeneficiaryInfo>) {
    this.signUpService.submitBeneficiaryApplication(beneficiary).subscribe(resp => {
      // this.analytics.logEvent(AnalyticsEventTypes.IdDocumentSubmitted);
      this.router.navigateByUrl('/signup/account-selection');
    });
  }
}
