import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralInformationFacade } from '../facade';
import { IGeneralInfo } from '@app/core';
import * as moment from 'moment';
/**
 * * Ticket: MM2-332
 * * Issue Details: CURP Verification issue
 * * Developer Feedback: Issue Fixed
 * Date: Jun 12, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */
@Component({
  selector: 'mbc-general-information',
  templateUrl: './general-information.page.html',
  styleUrls: ['./general-information.page.scss']
})
export class GeneralInformationPage implements OnInit {
  nameMaxLength = 26;
  curpMaxLength = 18;
  generalForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public facade: GeneralInformationFacade) {}

  ngOnInit() {
    this.initGeneralInfoForm();
  }

  initGeneralInfoForm() {
    this.generalForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.maxLength(this.nameMaxLength), Validators.pattern('^[A-Za-z]+$')]
      ],
      secondName: ['', [Validators.maxLength(this.nameMaxLength), Validators.pattern('^[A-Za-z]+$')]],
      paternalLastName: [
        '',
        [Validators.required, Validators.maxLength(this.nameMaxLength), Validators.pattern('^[A-Za-z]+$')]
      ],
      maternalLastName: ['', [Validators.maxLength(this.nameMaxLength), Validators.pattern('^[A-Za-z]+$')]],
      dateOfBirth: ['', [Validators.required]],
      curp: [
        '',
        [
          Validators.required,
          Validators.minLength(this.curpMaxLength),
          Validators.maxLength(this.curpMaxLength),
          Validators.pattern('[A-Z]{4}\\d{6}[HM]{1}[A-Z]{5}[A-Z0-9]{1}\\d{1}')
        ]
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('\\d{10}')]]
    });
    this.initJumioDataIntoForm();
  }

  validateCurp() {
    const year = new Date(this.generalForm.controls.dateOfBirth.value).getFullYear();
    this.generalForm.controls.curp.clearValidators();
    const curpValidatorExpression =
      year >= 2000 ? '[A-Z]{4}\\d{6}[HM]{1}[A-Z]{5}[A-Z]{1}\\d{1}' : '[A-Z]{4}\\d{6}[HM]{1}[A-Z]{5}[0-9]{1}\\d{1}';
    this.generalForm.controls.curp.setValidators([
      Validators.required,
      Validators.minLength(this.curpMaxLength),
      Validators.maxLength(this.curpMaxLength),
      Validators.pattern(curpValidatorExpression)
    ]);
    if (this.generalForm.controls.curp.value) {
      this.generalForm.controls.curp.patchValue(this.generalForm.controls.curp.value);
    }
  }

  initJumioDataIntoForm() {
    const jumioData = this.facade.getJumioScannedIdData();
    this.generalForm.patchValue({
      firstName: jumioData.firstName ? jumioData.firstName : '',
      secondName: jumioData.secondName ? jumioData.secondName : '',
      paternalLastName: jumioData.paternalLastName ? jumioData.paternalLastName : '',
      dateOfBirth: jumioData.dateOfBirth ? jumioData.dateOfBirth : ''
    });
  }

  applyGeneralInformation() {
    const generalInfo = this.generalForm.value as IGeneralInfo;
    generalInfo.dateOfBirth = moment(generalInfo.dateOfBirth).format('MM-DD-YYYY');
    generalInfo.mobileNumber = generalInfo.mobileNumber.toString();
    if (this.generalForm.valid) {
      this.facade.applyGeneralInformation(generalInfo);
    }
  }
}
