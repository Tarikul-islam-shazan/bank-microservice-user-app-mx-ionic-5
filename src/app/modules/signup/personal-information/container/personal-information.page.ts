/**
 * Issue: MM2-40
 * Feature: Personal Information Page
 * Details:  Personal Information user interface page
 * Date: April 24, 2020
 * Developer: Kausar <md.kausar@brainstation23.com>
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpPersonalInfoFacade, PersonalInfoFormControls } from '@app/signup/personal-information/facade';
import { IDropdownOption } from '@app/core/models/static-data';
@Component({
  selector: 'mbc-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss']
})
export class PersonalInformationPage implements OnInit {
  personalInformationForm: FormGroup;
  seletedCountryOfBirthCode: string;
  skipErrorFields: Record<string, string | boolean>;
  constructor(private formBuilder: FormBuilder, public facade: SignUpPersonalInfoFacade) {}

  ngOnInit() {
    this.facade.getStaticData();
    this.seletedCountryOfBirthCode = this.facade.mexicoCountryCode;
    this.initPersonalInformationForm();
  }
  private initPersonalInformationForm(): void {
    this.personalInformationForm = this.formBuilder.group({
      countryOfBirth: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      sex: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      highestLevelOfEducation: ['', Validators.required],
      profession: ['', Validators.required],
      occupation: ['', Validators.required],
      economicActivity: ['', Validators.required],
      banxicoActivity: ['', Validators.required]
    });
    this.skipErrorFields = { ...this.personalInformationForm.value };
    this.facade.personalInformation = this.personalInformationForm.value;
  }

  isInputFieldSkip(formControlName: string) {
    const formFields: string[] = Object.keys(this.personalInformationForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.personalInformationForm.controls[field].invalid) {
        this.skipErrorFields[field] = true;
      }
    }
    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorFields[field] = false;
    }
  }

  /**
   *
   * @sumary A function to get error-input or white-input css class
   * @param {string} formControlName
   * @returns
   * @memberof PersonalInformationPage
   */
  getValidationCssClass(formControlName: string) {
    return this.personalInformationForm.controls[formControlName].invalid && this.skipErrorFields[formControlName]
      ? 'error-input'
      : 'white-input';
  }

  /**
   *
   * @summary A function to open dropdown value into modal and Get selected value form that.
   * @param {string} formControlName
   * @param {IDropdownOption[]} options
   * @returns {Promise<any>}
   * @memberof PersonalInformationPage
   */
  async openOptionsModal(formControlName: string, options: IDropdownOption[]): Promise<void> {
    this.isInputFieldSkip(formControlName);

    this.facade.openDropdownOptionsModal(formControlName, options, data => {
      this.personalInformationForm.controls[formControlName].patchValue(data.text);
      this.updateValueAsDependencyDropdownAndValue(formControlName, data.value);
    });
  }

  /**
   * @summary A function to update dropdown list and value according to dependency dropdown
   *
   * @param {string} formControlName
   * @param {string} value
   * @memberof PersonalInformationPage
   */
  updateValueAsDependencyDropdownAndValue(formControlName: string, value: string): void {
    switch (formControlName) {
      case PersonalInfoFormControls.CountryOfBirth:
        this.seletedCountryOfBirthCode = value;
        const updateInfoForCountryOfBirth = { placeOfBirth: '' };
        this.personalInformationForm.patchValue(updateInfoForCountryOfBirth);
        this.facade.updatePersonalInformation(updateInfoForCountryOfBirth);
        break;
      case PersonalInfoFormControls.Occupation:
        const updateInfoForOccupation = {
          economicActivity: '',
          banxicoActivity: ''
        };
        this.facade.updateEconomicActivityOptions(value);
        // clearing Banxico Activity dropdown options
        this.facade.updateBanxicoActivityOptions('');
        this.personalInformationForm.patchValue(updateInfoForOccupation);
        this.facade.updatePersonalInformation(updateInfoForOccupation);
        break;
      case PersonalInfoFormControls.EconomicActivity:
        const updateInfoForEconomicActivity = {
          banxicoActivity: ''
        };
        this.facade.updateBanxicoActivityOptions(value);
        this.personalInformationForm.patchValue(updateInfoForEconomicActivity);
        this.facade.updatePersonalInformation(updateInfoForEconomicActivity);
        break;
    }
  }

  /**
   * @summary A function to call savePersonalInfomation facade method
   * by modifying placeOfBirth which depends on CountryOfBirth is Mexico Or Not
   *
   * @memberof PersonalInformationPage
   */
  submitPersonalInfomation() {
    if (!this.facade.isCountryOfBirthMexico(this.seletedCountryOfBirthCode)) {
      const { placeOfBirth } = this.personalInformationForm.value;
      this.facade.updatePersonalInformation({ placeOfBirth });
    }
    this.facade.savePersonalInfomation();
  }
}
