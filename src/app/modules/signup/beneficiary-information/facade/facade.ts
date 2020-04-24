import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, StaticDataService, StaticDataCategory, IMember } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { IBeneficiaryInfo } from '@app/core/models/dto/signup';
import { DropdownOption } from '@app/signup/models/signup';

@Injectable()
export class BeneficiaryFacade {
  relationshipData: DropdownOption[];
  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private analytics: AnalyticsService,
    private staticDataService: StaticDataService
  ) {}

  /**
   * this method is used to fetch the static data for the dropdown
   *
   * @returns
   * @memberof BeneficiaryFacade
   */
  fetchRelationshipData(): void {
    this.staticDataService.get([StaticDataCategory.Relationship]).subscribe(resp => {
      this.relationshipData = [];
      resp.relationship.forEach(data => {
        this.relationshipData.push({
          value: data.value,
          text: data.text
        });
      });
    });
  }

  /**
   * this method is used to submit the beneficiary data to the server
   *
   * @param {Partial<IBeneficiaryInfo>} beneficiary
   * @memberof BeneficiaryFacade
   */
  submit(beneficiary: Partial<IBeneficiaryInfo>) {
    this.signUpService.submitBeneficiaryApplication(beneficiary).subscribe((resp: IMember) => {
      this.analytics.logEvent(AnalyticsEventTypes.SignupBeneficiaryInfoCompleted);
      this.router.navigateByUrl('/signup/account-selection');
    });
  }
}