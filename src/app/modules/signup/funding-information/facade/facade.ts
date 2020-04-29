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
import * as moment from 'moment';

@Injectable()
export class FundingInformationFacade {
  fundInfo: IFundInfo;

  constructor(private signupService: SignUpService, private router: Router, private analytics: AnalyticsService) {}

  /**
   * @method fundInformationSubmit Initialization funding information form
   *
   * @memberof FundingInformationFacade
   * Issue: MM2-44
   * Details:  Funding Information: Proccess form value. Get result and redirect to appropriate page.
   * Date: April 24,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  fundInformationSubmit(fundInformation) {
    this.fundInfo = fundInformation;
    let fundtype = '';
    if (this.fundInfo.fundMyself) {
      fundtype = 'Self';
      delete this.fundInfo.providerInfo;
    } else {
      fundtype = 'Someone else';
      this.fundInfo.providerInfo.dateOfBirth = moment(this.fundInfo.providerInfo.dateOfBirth).format('MM-DD-YYYY');
    }
    this.signupService.fundingInformationSubmission(this.fundInfo).subscribe(res => {
      this.analytics.logEvent(AnalyticsEventTypes.FundingProviderSelect, { whoWillFund: fundtype });
      this.router.navigate(['/signup/government-disclosure']);
    });
  }
}
