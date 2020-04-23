import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FundingInformationFacade } from '../facade';
import * as moment from 'moment';
import { IFundInfo, IProviderInfo } from '../model/fundinfo';
import { Router } from '@angular/router';

@Component({
  selector: 'mbc-funding-information',
  templateUrl: './funding-information.page.html',
  styleUrls: ['./funding-information.page.scss']
})
export class FundingInformationPage implements OnInit {
  fundingInformationForm: FormGroup;
  maxDate: string;
  fundInfo: IFundInfo;
  providerInformation: IProviderInfo;
  selfFund = true;
  isSelfFund: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, public facade: FundingInformationFacade) {
    this.maxDate = moment().format('YYYY-MM-DD');
    this.isSelfFund = true;
    this.providerInformation = {
      firstName: '',
      secondName: '',
      paternalLastName: '',
      maternalLastName: '',
      dateOfBirth: ''
    };
    this.fundInfo = {
      fundMyself: true
    };
  }

  ngOnInit() {}

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
   * @method checkSelfFund toggle - funding infromation form display
   *
   * @memberof FundingInformationPage
   * Details:  Funding Information: If self fund then hide 'someonelse' info form.
   * Date: April 21,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */
  checkSelfFund(event) {
    if (event.detail.value === !this.selfFund) {
      this.isSelfFund = false;
      this.initFundingInformationForm();
    }
    if (event.detail.value === this.selfFund) {
      this.isSelfFund = true;
    }
  }

  /**
   * @method next formating funding information form value
   *
   * @memberof FundingInformationPage
   * Issue: MM2-44
   * Details:  Funding Information: If self fund then set deafult value true otherwise false and set provider information.
   * Date: April 21,2020
   * Developer: Tarikul <tarikul@brainstation23.com>
   */

  next(): void {
    if (this.isSelfFund) {
      this.fundInfo.fundMyself = true;
      this.facade.goToNext(this.fundInfo);
    } else {
      this.fundInfo.fundMyself = false;
      this.fundingInformationForm.value.dateOfBirth = moment(this.fundingInformationForm.value.dob)
        .format('DD-MM-YYYY')
        .toString();
      this.providerInformation = this.fundingInformationForm.value;
      this.fundInfo.providerInfo = this.providerInformation;
      this.facade.goToNext(this.fundInfo);
    }
  }
}
