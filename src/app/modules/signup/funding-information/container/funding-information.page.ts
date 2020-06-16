import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FundingInformationFacade } from '../facade';
import * as moment from 'moment';

@Component({
  selector: 'mbc-funding-information',
  templateUrl: './funding-information.page.html',
  styleUrls: ['./funding-information.page.scss']
})
export class FundingInformationPage {
  fundingInformationForm: FormGroup;
  maxDate: string;
  fundMyself = true;

  constructor(private formBuilder: FormBuilder, public facade: FundingInformationFacade) {}

  get maximumDate() {
    return moment().format('YYYY-MM-DD');
  }

  /**
   * @method initFundingInformationForm Initialization funding information form
   *
   * @memberof FundingInformationPage
   * Issue: MM2-44
   * Details:  Funding Information: Form intialization.
   * Date: April 21,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  initFundingInformationForm(): void {
    this.fundingInformationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(26)]],
      secondName: ['', [Validators.maxLength(26)]],
      paternalLastName: ['', [Validators.required, Validators.maxLength(26)]],
      maternalLastName: ['', [Validators.maxLength(26)]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  /**
   * @method checkFundMyself Form intilization and form visibility
   *
   * @memberof FundingInformationPage
   * Issue: MM2-44
   * Details:  This method will do form intilization and form visibility.
   * Date: June 16,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  checkFundMyself(event: CustomEvent): void {
    if (event.detail.value === 'true') {
      this.fundMyself = true;
      this.initFundingInformationForm();
    } else {
      this.fundMyself = false;
    }
  }

  /**
   * @method fundInformationFormSubmit formating funding information form value
   *
   * @memberof FundingInformationPage
   * Issue: MM2-44
   * Details:  Funding Information: Map form value.
   * Date: April 21,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  fundInformationFormSubmit(): void {
    const fundMyself = this.fundMyself;
    const providerInfo = this.fundingInformationForm.value;
    this.facade.fundInformationSubmit({ fundMyself, providerInfo });
  }
}
