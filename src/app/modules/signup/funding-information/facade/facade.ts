/**
 * @Facade FundingInformationFacade
 *
 * Details:  Funding Information: Submit funding info data and get response.
 * Date: April 21,2020
 * Developer: Tarikul <tarikul@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '@app/core';
import { IFundInfo } from '../model/fundinfo';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class FundingInformationFacade {
  fundInfo: IFundInfo;

  constructor(
    private signupService: SignUpService,
    private router: Router,
    private readonly analyticsService: AnalyticsService
  ) {}

  /**
   * @method fundInformationSubmit Initialization funding information form
   *
   * @memberof FundingInformationFacade
   * Issue: MM2-44
   * Details:  Funding Information: Proccess form value. Get result and redirect to appropriate page.
   * Date: April 24,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  fundInformationSubmit(fundInformation: IFundInfo) {
    this.signupService.fundingInformationSubmission(fundInformation).subscribe(res => {
      this.analyticsService.logEvent(AnalyticsEventTypes.FundingProviderSelect, {
        fundMyself: fundInformation.fundMyself
      });
      this.router.navigate(['/signup/government-disclosure']);
    });
  }
}
