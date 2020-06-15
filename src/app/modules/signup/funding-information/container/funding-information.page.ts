import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FundingInformationFacade } from '../facade';
import * as moment from 'moment';
import { IinputOption, InputFormatType } from '@app/shared';

@Component({
  selector: 'mbc-funding-information',
  templateUrl: './funding-information.page.html',
  styleUrls: ['./funding-information.page.scss']
})
export class FundingInformationPage implements OnInit {
  fundingInformationForm: FormGroup;
  maxDate: string;
  onlyWords: IinputOption;
  onlyWord: IinputOption;

  constructor(private formBuilder: FormBuilder, public facade: FundingInformationFacade) {
    this.onlyWords = {
      type: InputFormatType.WORDS
    };
    this.onlyWord = {
      type: InputFormatType.ONLY_ONE_WORD
    };
  }

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
      fundMyself: [true, [Validators.required]],
      firstName: ['', [Validators.required, Validators.maxLength(26)]],
      secondName: ['', [Validators.maxLength(26)]],
      paternalLastName: ['', [Validators.required, Validators.maxLength(26)]],
      maternalLastName: ['', [Validators.maxLength(26)]],
      dateOfBirth: ['', [Validators.required]]
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
    const { fundMyself } = this.fundingInformationForm.value;
    const providerInfo = this.fundingInformationForm.value;
    delete providerInfo.fundMyself;
    this.facade.fundInformationSubmit({ fundMyself, providerInfo });
  }
}
