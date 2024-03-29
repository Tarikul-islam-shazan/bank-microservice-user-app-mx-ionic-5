/**
 * Feature: Address Information Page
 * Details: This is address information page, all field validation and submition done
 * Date: April 21, 2020
 * Developer: Sudipta Ghosh <sudipta.ghosh@bs-23.net>
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownOption } from '@app/signup/models/signup';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent, IinputOption, InputFormatType } from '@app/shared';
import { AddressInformationFacade } from '../facade';
import { IAddressInfo, IDropdownOption } from '@app/core';
const moment = require('moment');
/**
 *
 *
 * @export
 * @class AddressInformationPage
 * @implements {OnInit}
 */
@Component({
  selector: 'mbc-address-information',
  templateUrl: './address-information.page.html',
  styleUrls: ['./address-information.page.scss']
})
export class AddressInformationPage implements OnInit {
  addressForm: FormGroup;
  skipErrorFields: any;
  aplhaNumeric: IinputOption;
  postalCodeNumber: IinputOption;
  suburbFieldData: IDropdownOption[] = [];
  public postalCodeData: Partial<IAddressInfo[]> = [];
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public facade: AddressInformationFacade
  ) {
    this.postalCodeNumber = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: 5
    };
    this.aplhaNumeric = {
      type: InputFormatType.ALPHA_NUMERIC,
      maxLength: 10
    };
  }

  ngOnInit() {
    this.facade.getStaticData();
    this.initAddressForm();
  }

  /**
   *
   *
   * @memberof AddressInformationPage
   */
  initAddressForm(): void {
    this.addressForm = this.formBuilder.group({
      addressTypeField: [null, Validators.required],
      addressType: [null, Validators.required],
      propertyTypeField: [null, Validators.required],
      propertyType: [null, Validators.required],
      street: [null, [Validators.required, Validators.maxLength(40)]],
      outdoorNumber: [null, [Validators.required, Validators.maxLength(10)]],
      interiorNumber: ['', [Validators.maxLength(10)]],
      postCode: [null, [Validators.required, Validators.maxLength(5)]],
      stateField: [null, Validators.required],
      state: [null, Validators.required],
      municipalityField: [null, Validators.required],
      municipality: [null, Validators.required],
      cityField: [null, Validators.required],
      city: [null, Validators.required],
      suburbField: [null, Validators.required],
      suburb: [null, Validators.required],
      dateOfResidence: [null, Validators.required]
    });
    this.skipErrorFields = Object.assign({}, this.addressForm.value);
  }

  /**
   *
   *
   * @param {string} formControlName
   * @memberof AddressInformationPage
   */
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
   *
   *
   * @param {string} formControlName
   * @param {string} formControlValue
   * @param {DropdownOption[]} options
   * @returns {Promise<any>}
   * @memberof AddressInformationPage
   */
  async openOptionsModal(formControlName: string, formControlValue: string, options: DropdownOption[]): Promise<any> {
    this.isInputFieldSkip(formControlName);
    try {
      const modal = await this.modalCtrl.create({
        component: DropdownModalComponent,
        componentProps: { data: options }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.addressForm.controls[formControlName].patchValue(data.text);
      this[formControlName] = data ? data : null;
      this.addressForm.controls[formControlValue].patchValue(data.value);
    } catch (error) {}
  }

  /**
   *
   *
   * @param {*} postalCode
   * @memberof AddressInformationPage
   */
  getPostalCodeInfo(postalCode): void {
    if (postalCode.toString().length === 5) {
      this.facade.getPostalCodeInfo(postalCode).subscribe(
        (data: Partial<IAddressInfo[]>) => {
          this.setPostalCodeInfo(true, data);
        },
        err => {
          this.setPostalCodeInfo(false);
        }
      );
    }
  }

  /**
   *
   *
   * @param {boolean} isDataAvailable
   * @param {Partial<IAddressInfo[]>} [data]
   * @memberof AddressInformationPage
   */
  setPostalCodeInfo(isDataAvailable: boolean, data?: Partial<IAddressInfo[]>): void {
    this.postalCodeData = isDataAvailable ? data : null;
    this.suburbFieldData = this.mappingData(isDataAvailable ? data : []);
    this.addressForm.controls.postCode.patchValue(isDataAvailable ? this.addressForm.controls.postCode.value : null);
    this.addressForm.controls.stateField.patchValue(isDataAvailable ? data[0].stateName : null);
    this.addressForm.controls.state.patchValue(isDataAvailable ? data[0].state : null);
    this.addressForm.controls.municipalityField.patchValue(isDataAvailable ? data[0].municipalityName : null);
    this.addressForm.controls.municipality.patchValue(isDataAvailable ? data[0].municipality : null);
    this.addressForm.controls.cityField.patchValue(isDataAvailable ? data[0].cityName : null);
    this.addressForm.controls.city.patchValue(isDataAvailable ? data[0].city : null);
    this.addressForm.controls.suburbField.patchValue(null);
    this.addressForm.controls.suburb.patchValue(null);
  }

  /**
   *
   *
   * @param {Partial<IAddressInfo[]>} postalCodeData
   * @returns {IDropdownOption[]}
   * @memberof AddressInformationPage
   */
  mappingData(postalCodeData: Partial<IAddressInfo[]>): IDropdownOption[] {
    const suburbFieldDropDownData: IDropdownOption[] = [];
    postalCodeData.forEach(data => {
      suburbFieldDropDownData.push({
        value: data.suburbName,
        text: data.suburbName
      });
    });
    return suburbFieldDropDownData;
  }

  /**
   *
   * @description submit address information
   * @memberof AddressInformationPage
   */
  next(): void {
    const addressInfoData = this.addressForm.value;
    delete addressInfoData.addressTypeField;
    delete addressInfoData.propertyTypeField;
    delete addressInfoData.stateField;
    delete addressInfoData.cityField;
    delete addressInfoData.municipalityField;
    delete addressInfoData.suburbField;
    addressInfoData.dateOfResidence = addressInfoData.dateOfResidence
      ? moment(addressInfoData.dateOfResidence.split('T')[0]).format('MM-DD-YYYY')
      : '';
    this.facade.goToNext(addressInfoData);
  }
}
