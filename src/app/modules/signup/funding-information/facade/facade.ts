/**
 * @Facade FundingInformationFacade
 *
 * Details:  Funding Information: Submit funding info data and get response.
 * Date: April 21,2020
 * Developer: Tarikul <tarikul@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, Logger } from '@app/core';
import { AnalyticsService } from '@app/analytics';
import { IFundInfo } from '../model/fundinfo';

const log = new Logger('FundingInformationFacade');
@Injectable()
export class FundingInformationFacade {
  constructor(private signupService: SignUpService, private router: Router, private analytics: AnalyticsService) {}

  goToNext(fundInfo: IFundInfo) {
    this.signupService.fundingInformation(fundInfo).subscribe(
      res => {
        this.router.navigate(['/signup/account-selection']);
      },
      err => {}
    );
  }
}
