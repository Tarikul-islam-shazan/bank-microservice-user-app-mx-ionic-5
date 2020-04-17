import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mbc-general-information',
  templateUrl: './general-information.page.html',
  styleUrls: ['./general-information.page.scss']
})
export class GeneralInformationPage implements OnInit {
  generalForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initGeneralInfoForm();
  }

  initGeneralInfoForm() {
    this.generalForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(26)]],
      secondName: [null, [Validators.maxLength(26)]],
      paternalLastName: [null, [Validators.required, Validators.maxLength(26)]],
      maternalLastName: [null, [Validators.maxLength(26)]],
      dateOfBirth: [null, [Validators.required]],
      curp: [null, [Validators.required, Validators.maxLength(18)]],
      mobileNumber: [null, [Validators.required, Validators.maxLength(10)]]
    });
  }
}
