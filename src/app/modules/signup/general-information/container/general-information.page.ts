import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralInformationFacade } from '../facade';
import { IGeneralInfo } from '@app/core';
import * as moment from 'moment';
/**
 * * Ticket: MM2-3
 * * Issue Details: General Information API Integration
 * * Developer Feedback: API integrated
 * Date: April 21, 2020
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
      firstName: ['', [Validators.required, Validators.maxLength(26)]],
      secondName: ['', [Validators.maxLength(26)]],
      paternalLastName: ['', [Validators.required, Validators.maxLength(26)]],
      maternalLastName: ['', [Validators.maxLength(26)]],
      dateOfBirth: ['', [Validators.required]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('\\d{10}')]]
    });
    this.initJumioDataIntoForm();
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
