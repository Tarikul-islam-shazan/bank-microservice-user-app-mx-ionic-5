import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FundingInformationFacade } from '../facade';
import * as moment from 'moment';

@Component({
  selector: 'mbc-funding-information',
  templateUrl: './funding-information.page.html',
  styleUrls: ['./funding-information.page.scss']
})
export class FundingInformationPage implements OnInit {
  fundingInformationForm: FormGroup;
  maxDate: string;

  constructor(private formBuilder: FormBuilder, public facade: FundingInformationFacade) {}

  ngOnInit() {
    this.initFundingInformationForm();
  }

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
      fundMyself: [this.facade.fundInformation.fundMyself, [Validators.required]],
      firstName: [this.facade.fundInformation.providerInfo.firstName, [Validators.required, Validators.maxLength(26)]],
      secondName: [this.facade.fundInformation.providerInfo.secondName, [Validators.maxLength(26)]],
      paternalLastName: [
        this.facade.fundInformation.providerInfo.paternalLastName,
        [Validators.required, Validators.maxLength(26)]
      ],
      maternalLastName: [this.facade.fundInformation.providerInfo.maternalLastName, [Validators.maxLength(26)]],
      dateOfBirth: [this.facade.fundInformation.providerInfo.dateOfBirth, [Validators.required]]
    });
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
    const {
      fundMyself,
      firstName,
      secondName,
      dateOfBirth,
      paternalLastName,
      maternalLastName
    } = this.fundingInformationForm.value;
    this.facade.fundInformationSubmit({
      fundMyself,
      providerInfo: {
        firstName,
        secondName,
        dateOfBirth,
        paternalLastName,
        maternalLastName
      }
    });
  }
}
