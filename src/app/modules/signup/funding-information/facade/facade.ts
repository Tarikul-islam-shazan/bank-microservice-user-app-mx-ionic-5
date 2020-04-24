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
import * as moment from 'moment';

@Injectable()
export class FundingInformationFacade {
  fundInfo: IFundInfo;

  constructor(private signupService: SignUpService, private router: Router) {
    this.initializefundInformation();
  }

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
    if (this.fundInfo.fundMyself) {
      delete this.fundInfo.providerInfo;
    } else {
      this.fundInfo.providerInfo.dateOfBirth = moment(this.fundInfo.providerInfo.dateOfBirth).format('DD-MM-YYYY');
    }
    this.signupService.fundingInformationSubmission(this.fundInfo).subscribe(res => {
      this.router.navigate(['/signup/account-selection']);
    });
  }

  get fundInformation() {
    return this.fundInfo;
  }

  /**
   * @method initializefundInformation Initialization funding information object
   *
   * @memberof FundingInformationFacade
   * Issue: MM2-44
   * Details:  Funding Information: Intialization of funding info model object.
   * Date: April 24,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  initializefundInformation() {
    this.fundInfo = {
      fundMyself: true,
      providerInfo: {
        firstName: '',
        secondName: '',
        paternalLastName: '',
        maternalLastName: '',
        dateOfBirth: ''
      }
    };
  }
}
