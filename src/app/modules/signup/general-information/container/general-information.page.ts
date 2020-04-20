import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralInformationFacade } from '../facade';
import { IGeneralInfo } from '@app/core';

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
      mobileNumber: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  initJumioDataIntoForm() {
    const { firstName, lastName, dateOfBirth } = this.facade.getJumioScannedIdData();
    const [first, ...rest] = firstName.split(' ');
    this.generalForm.patchValue({
      firstName: first ? first : '',
      middleName: rest ? rest.join(' ') : '',
      lastName: lastName ? lastName : '',
      dateOfBirth: dateOfBirth ? dateOfBirth : ''
    });
  }

  applyGeneralInformation() {
    const generalInfo = this.generalForm.value as IGeneralInfo;
    this.facade.applyGeneralInformation(generalInfo);
  }
}
