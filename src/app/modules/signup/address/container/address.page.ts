import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMemberApplication, IStates, IScannedIdData } from '@app/core';
import { CountryStateModalComponent, ModalService, UtilService } from '@app/shared';
import { SignupAddressFacade } from '../facade';
import * as moment from 'moment';
import { AddressRadioButtonOption } from '@app/signup/models/signup';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss']
})
export class AddressPage implements OnInit {
  memberApplication: IMemberApplication = {};
  addressForm: FormGroup;
  armedForcesForm: FormGroup;
  skipErrorFields: any;
  countryStates: IStates[];
  selectedCountryState: IStates;
  jumioScanData: IScannedIdData;
  isDependent = false;
  skipErrorFieldsForArmedForcesForm: any;
  radioOption: typeof AddressRadioButtonOption = AddressRadioButtonOption;
  phoneMask: IinputOption; // input directive property for phone number
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private facade: SignupAddressFacade,
    private utilService: UtilService
  ) {
    this.phoneMask = {
      type: InputFormatType.PHONE_MASK
    };
  }

  /**
   * @method ngOnInit init getCountryStates initAddressForm
   *
   * @memberof AddressPage
   * Issue: GMA-4687
   * Details: Signup: Wrong date of birth passed to axxiome.
   * Date: March 10, 2020
   * Developer: Utpal<Utpal.Sarker@brainstation23.com>
   */
  ngOnInit() {
    this.getCountryStates();
    this.initAddressForm();
  }
  /**
   *  A function used to initialize Address form.
   *
   *  Issue: GMA-4427
   *  Removing validators from zipCode control.
   *  ZipCode validation is handled by FormateZipCodeDirective.
   * @memberof AddressPage
   * Ticket: GMA-4466
   * Fix: date initialize remove
   * Date: March 08, 2020
   * Developer: Utpaul <utpal.Sarker@brainstation23.com>
   */

  initArmedForcesForm(): void {
    this.armedForcesForm = this.formBuilder.group({
      armedForcesMemberFirstName: ['', [Validators.required]],
      armedForcesMemberLastName: ['', [Validators.required]],
      armedForcesSocialSecurityPin: [null, [Validators.required]],
      armedForcesMemberDob: ['', [Validators.required]]
    });
    this.skipErrorFieldsForArmedForcesForm = Object.assign({}, this.armedForcesForm.value);
  }

  /**
   * Issue:  fix/GMA-4647
   * Details:  Where do you live screen: Need to implement "Red text" error message for all fields.
   * Added required validations
   * Date: March 05, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  initAddressForm(): void {
    this.addressForm = this.formBuilder.group({
      addressLine1: [null, Validators.required],
      addressLine2: [''],
      city: [null, [Validators.required, Validators.minLength(4)]],
      state: [null, Validators.required],
      zipCode: [null, Validators.required],
      mobilePhone: [null, [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      workPhone: ['', [Validators.maxLength(16), Validators.minLength(16)]],
      workPhoneExtension: [''],
      isRelatedToArmedForces: [AddressRadioButtonOption.Neither, Validators.required]
    });
    this.initJumioDataIntoForm();
    this.skipErrorFields = Object.assign({}, this.addressForm.value);
  }

  initJumioDataIntoForm() {
    this.jumioScanData = this.facade.getJumioScanData();
    this.addressForm.controls.addressLine1.patchValue(this.jumioScanData ? this.jumioScanData.addressLine : null);
    this.addressForm.controls.city.patchValue(this.jumioScanData ? this.jumioScanData.city : null);
    this.addressForm.controls.zipCode.patchValue(this.jumioScanData ? this.jumioScanData.postCode : null);
  }

  /**
   * @method update State of a address
   *
   * @param {IStates} [selectedCountryState]
   * @memberof AddressPage
   *
   * Ticket: GMA-4317
   * Details: fill state which is came from jumio
   * Date: March 06, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  updateAddressState(selectedCountryState?: IStates): void {
    if (!selectedCountryState) {
      this.selectedCountryState = this.countryStates.find(state => {
        return state.stateAbv === this.jumioScanData.subdivision;
      });
    } else {
      this.selectedCountryState = selectedCountryState;
    }
    this.addressForm.controls.state.patchValue(this.selectedCountryState.stateName);
    this.memberApplication.state = this.selectedCountryState.stateAbv;
    this.removeSelectedState();
  }

  getCountryStates() {
    this.facade.getCountryState().subscribe(countryStates => {
      this.countryStates = countryStates;
      if (this.jumioScanData.subdivision) {
        this.updateAddressState();
      }
    });
  }

  /**
   * @method openStateModal by clicking button and open modal
   *
   * @memberof AddressPage
   * Ticket: GMA-4317
   * Details: modal open and dissmiss @method removeSelectedState resolve
   * Date: March 06, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  openStateModal() {
    if (this.selectedCountryState) {
      this.countryStates.unshift(this.selectedCountryState);
    }
    this.modalService.openModal(CountryStateModalComponent, { data: this.countryStates }, resp => {
      const { data } = resp;
      if (data) {
        this.updateAddressState(data);
      } else {
        this.removeSelectedState();
      }
    });
  }

  removeSelectedState() {
    this.countryStates = this.countryStates.filter(state => {
      return state.stateAbv !== this.selectedCountryState.stateAbv;
    });
  }

  /**
   * Feature: Dependent form  feature for armed forces memeber
   * Details: When user check dependent member then additional field will be added inorder to fill up those field
   * Date: February 20, 2020
   * Developer: Tarikul tarikul@brainstation23.com
   */
  dependentFromShow(event: CustomEvent): void {
    if (event.detail.value === AddressRadioButtonOption.Dependent) {
      this.isDependent = true;
      this.initArmedForcesForm();
    } else {
      this.isDependent = false;
    }
  }

  isInputFieldSkipForArmedForcesForm(formControlName: string) {
    const formFields: string[] = Object.keys(this.armedForcesForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.armedForcesForm.controls[field].invalid) {
        this.skipErrorFieldsForArmedForcesForm[field] = true;
      }
    }
    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorFieldsForArmedForcesForm[field] = false;
    }
  }

  isInputFieldSkip(formControlName: string) {
    const formFields: string[] = Object.keys(this.addressForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.addressForm.controls[field].invalid) {
        this.skipErrorFields[field] = true;
      }
    }
    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorFields[field] = false;
    }
  }

  /**
   * @method next formating addressForm value and seting on memberApplication
   *
   * @memberof AddressPage
   * Issue: GMA-4687
   * Details: Signup: Wrong date of birth passed to axxiome.
   * Date: March 10, 2020
   * Developer: Utpal<Utpal.Sarker@brainstation23.com>
   */

  /**
   * Issue: GMA-4646
   * Details:  General Information: Input fields not visible because of the keypad.
   * added phoneMask directive and util service for removing special characters and dailcode
   * Date: April 03, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  next(): void {
    const {
      addressLine1,
      addressLine2,
      city,
      zipCode,
      mobilePhone,
      workPhone,
      isRelatedToArmedForces
    } = this.addressForm.value;
    this.memberApplication.addressLine1 = addressLine1;
    this.memberApplication.addressLine2 = addressLine2;
    this.memberApplication.city = city;
    this.memberApplication.zipCode = zipCode;
    this.memberApplication.mobilePhone = this.utilService.removeSpecialCharactersAndSpaces(mobilePhone.toString());
    this.memberApplication.workPhone = this.utilService.removeSpecialCharactersAndSpaces(workPhone.toString());
    this.memberApplication.isRelatedToArmedForces = isRelatedToArmedForces;
    if (this.isDependent) {
      const {
        armedForcesMemberFirstName,
        armedForcesMemberLastName,
        armedForcesMemberDob,
        armedForcesSocialSecurityPin
      } = this.armedForcesForm.value;
      this.memberApplication.armedForcesMemberFirstName = armedForcesMemberFirstName;
      this.memberApplication.armedForcesMemberLastName = armedForcesMemberLastName;
      this.memberApplication.armedForcesDob = armedForcesMemberDob ? armedForcesMemberDob.split('T')[0] : '';
      this.memberApplication.armedForcesSocialSecurityPin = armedForcesSocialSecurityPin;
    }
    this.memberApplication.country = 'US'; // TODO: Need to get Country Name from Back End
    this.facade.goToNext(this.memberApplication);
  }
}
