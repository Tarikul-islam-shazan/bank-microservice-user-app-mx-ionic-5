/**
 * Container: Change Address Modal Page
 * Details: Updating the customer  address, city, street or Zip code  .
 * Date: February 14,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 *
 */
import { ChangeAddressFacade } from '../facade';
import { ICustomer, IDropdownOption, IAddressInfo, IAddress, StaticData } from '@app/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DropdownModalComponent, IinputOption, InputFormatType } from '@app/shared';
import { DropdownOption } from '@app/signup/models/signup';
const moment = require('moment');
@Component({
  selector: 'change-address',
  templateUrl: './change-address.page.html',
  styleUrls: ['./change-address.page.scss']
})
export class ChangeAddressPage implements OnDestroy, OnInit {
  changeAddressForm: FormGroup;
  changeAddressFormSubscription: Subscription;
  address: IAddress = {};
  isFormValueChanged = false;
  initialFormValue: ICustomer = {};
  suburbFieldData: IDropdownOption[] = [];
  aplhaNumeric: IinputOption;
  postalCodeNumber: IinputOption;
  public postalCodeData: Partial<IAddressInfo[]> = [];
  public addressTypeList: IDropdownOption[] = [];
  public propertyTypeList: IDropdownOption[] = [];

  constructor(
    public facade: ChangeAddressFacade,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.aplhaNumeric = {
      type: InputFormatType.ALPHA_NUMERIC,
      maxLength: 10
    };
    this.postalCodeNumber = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: 5
    };
  }

  ionViewWillEnter() {
    this.facade.getStaticData();
  }

  ngOnInit() {
    this.getCustomer();
    this.initChangeAddressForm();
  }

  /**
   * @summary gets customer information
   *
   * @private
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  private getCustomer(): void {
    this.address = this.facade.customer.addresses[0];
  }

  /**
   *  A function used to initialize changeAddress form.
   *
   *  Issue: GMA-4427
   *  Removing validators from zipCode control.
   *  ZipCode validation is handled by FormateZipCodeDirective.
   * @memberof ChangeAddressPage
   */
  private initChangeAddressForm(): void {
    const {
      addressType,
      propertyType,
      street,
      outdoorNumber,
      interiorNumber,
      postCode,
      state,
      municipality,
      city,
      suburb,
      dateOfResidence
    } = this.address;

    this.changeAddressForm = this.formBuilder.group({
      addressTypeField: [null, Validators.required],
      addressType: [null, Validators.required],
      propertyTypeField: [null, Validators.required],
      propertyType: [null, Validators.required],
      street: [street, [Validators.required, Validators.maxLength(40)]],
      outdoorNumber: [outdoorNumber, [Validators.required, Validators.maxLength(10)]],
      interiorNumber: [interiorNumber, [Validators.maxLength(10)]],
      postCode: [postCode, [Validators.required, Validators.maxLength(5)]],
      stateField: [null, Validators.required],
      state: [state, Validators.required],
      municipalityField: [null, Validators.required],
      municipality: [municipality, Validators.required],
      cityField: [null, Validators.required],
      city: [city, Validators.required],
      suburbField: [suburb, Validators.required],
      suburb: [suburb, Validators.required],
      dateOfResidence: [dateOfResidence, Validators.required]
    });
    const suburbValueExist = suburb ? true : false;
    this.getPostalCodeInfo(postCode, suburbValueExist);
    this.filterAddressType(addressType, propertyType);
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
   *
   * @param {*} postalCode
   * @memberof AddressInformationPage
   */
  getPostalCodeInfo(postalCode, suburbValueExist: boolean): void {
    if (postalCode.toString().length === 5) {
      this.facade.getPostalCodeInfo(postalCode).subscribe(
        (data: Partial<IAddressInfo[]>) => {
          this.setPostalCodeInfo(true, data, suburbValueExist);
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
  setPostalCodeInfo(isDataAvailable: boolean, data?: Partial<IAddressInfo[]>, suburbValueExist?: boolean): void {
    this.postalCodeData = isDataAvailable ? data : null;
    this.suburbFieldData = this.mappingData(isDataAvailable ? data : []);
    this.changeAddressForm.controls.postCode.patchValue(
      isDataAvailable ? this.changeAddressForm.controls.postCode.value : null
    );
    this.changeAddressForm.controls.stateField.patchValue(isDataAvailable ? data[0].stateName : null);
    this.changeAddressForm.controls.state.patchValue(isDataAvailable ? data[0].state : null);
    this.changeAddressForm.controls.municipalityField.patchValue(isDataAvailable ? data[0].municipalityName : null);
    this.changeAddressForm.controls.municipality.patchValue(isDataAvailable ? data[0].municipality : null);
    this.changeAddressForm.controls.cityField.patchValue(isDataAvailable ? data[0].cityName : null);
    this.changeAddressForm.controls.city.patchValue(isDataAvailable ? data[0].city : null);
    this.changeAddressForm.controls.suburbField.patchValue(suburbValueExist ? data[0].suburbName : null);
    this.changeAddressForm.controls.suburb.patchValue(suburbValueExist ? data[0].suburbName : null);
  }

  /**
   * @summary checks if form values have been changed or not
   *
   * @private
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  checkIfFormValueChanged(): boolean {
    this.changeAddressFormSubscription = this.changeAddressForm.valueChanges.subscribe((changedFormValue: IAddress) => {
      this.isFormValueChanged = !isEqual(this.initialFormValue, changedFormValue);
    });
    return this.isFormValueChanged;
  }

  /**
   * @summary closes modal
   *
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  /**
   * @summary opens otp modal
   *
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  save(): void {
    const addressInfoData = this.changeAddressForm.value;
    delete addressInfoData.addressTypeField;
    delete addressInfoData.propertyTypeField;
    delete addressInfoData.stateField;
    delete addressInfoData.cityField;
    delete addressInfoData.municipalityField;
    delete addressInfoData.suburbField;
    addressInfoData.dateOfResidence = addressInfoData.dateOfResidence
      ? moment(addressInfoData.dateOfResidence.split('T')[0]).format('MM-DD-YYYY')
      : '';
    this.facade.save(this.changeAddressForm.value);
  }

  async openOptionsModal(formControlName: string, formControlValue: string, options: DropdownOption[]): Promise<any> {
    try {
      const modal = await this.modalCtrl.create({
        component: DropdownModalComponent,
        componentProps: { data: options }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.changeAddressForm.controls[formControlName].patchValue(data.text);
      this[formControlName] = data ? data : null;
      this.changeAddressForm.controls[formControlValue].patchValue(data.value);
    } catch (error) {}
  }

  ngOnDestroy() {
    if (this.changeAddressFormSubscription) {
      this.changeAddressFormSubscription.unsubscribe();
    }
  }
  filterAddressType(addressType: string, propertyType: string) {
    this.facade.getStaticData().subscribe(staticData => {
      this.addressTypeList = staticData[StaticData.AddressType];
      this.propertyTypeList = staticData[StaticData.PropertyType];
      const addressList = JSON.parse(JSON.stringify(this.addressTypeList));
      const propertyList = JSON.parse(JSON.stringify(this.propertyTypeList));
      const address = addressList.find(data => {
        return data.text === addressType;
      });
      const property = propertyList.find(data => {
        return (data.text = propertyType);
      });
      this.changeAddressForm.controls.addressTypeField.patchValue(address.text);
      this.changeAddressForm.controls.addressType.patchValue(address.value);
      this.changeAddressForm.controls.propertyTypeField.patchValue(property.text);
      this.changeAddressForm.controls.propertyType.patchValue(property.value);
      const initialForm = this.changeAddressForm.valueChanges.subscribe((changedFormValue: IAddress) => {
        if (this.changeAddressForm.valid) {
          this.initialFormValue = changedFormValue;
          initialForm.unsubscribe();
        }
      });
    });
  }
}
