/**
 * Container: Change Address Modal Page
 * Details: Updating the customer  address, city, street or Zip code  .
 * Date: February 14,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 *
 */
import { ChangeAddressFacade } from '../facade';
import { CommonValidators, ICustomer, IDropdownOption, IAddressInfo } from '@app/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DropdownModalComponent, IinputOption, InputFormatType } from '@app/shared';
import { DropdownOption } from '@app/signup/models/signup';

@Component({
  selector: 'change-address',
  templateUrl: './change-address.page.html',
  styleUrls: ['./change-address.page.scss']
})
export class ChangeAddressPage implements OnDestroy, OnInit {
  changeAddressForm: FormGroup;
  changeAddressFormSubscription: Subscription;
  customer: ICustomer = {};
  isFormValueChanged = false;
  initialFormValue: ICustomer = {};
  suburbFieldData: IDropdownOption[] = [];
  onlyNumber: IinputOption;
  postalCodeNumber: IinputOption;
  public postalCodeData: Partial<IAddressInfo[]> = [];

  constructor(
    public facade: ChangeAddressFacade,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.onlyNumber = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: 10
    };
    this.postalCodeNumber = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: 5
    };
  }

  ngOnInit() {
    this.getCustomer();
    this.facade.getStaticData();
    this.initChangeAddressForm();
    this.checkIfFormValueChanged();
  }

  /**
   * @summary gets customer information
   *
   * @private
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  private getCustomer(): void {
    this.customer = this.facade.customer;
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
    // const { address, city, stateName, zipCode } = this.customer;
    // this.changeAddressForm = this.formBuilder.group({
    //   address: [address, Validators.required],
    //   city: [city, Validators.required],
    //   state: [stateName, Validators.required],
    //   zipCode: [zipCode, CommonValidators.zipCodeValidation]
    // });
    this.changeAddressForm = this.formBuilder.group({
      addressTypeField: [null, Validators.required],
      addressType: [null, Validators.required],
      propertyTypeField: [null, Validators.required],
      propertyType: [null, Validators.required],
      street: [null, [Validators.required, Validators.maxLength(40)]],
      outdoorNumber: [null, [Validators.required, Validators.maxLength(10)]],
      interiorNumber: [null, [Validators.required, Validators.maxLength(10)]],
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
    this.changeAddressForm.controls.postCode.patchValue(
      isDataAvailable ? this.changeAddressForm.controls.postCode.value : null
    );
    this.changeAddressForm.controls.stateField.patchValue(isDataAvailable ? data[0].stateName : null);
    this.changeAddressForm.controls.state.patchValue(isDataAvailable ? data[0].state : null);
    this.changeAddressForm.controls.municipalityField.patchValue(isDataAvailable ? data[0].municipalityName : null);
    this.changeAddressForm.controls.municipality.patchValue(isDataAvailable ? data[0].municipality : null);
    this.changeAddressForm.controls.cityField.patchValue(isDataAvailable ? data[0].cityName : null);
    this.changeAddressForm.controls.city.patchValue(isDataAvailable ? data[0].city : null);
    this.changeAddressForm.controls.suburbField.patchValue(null);
    this.changeAddressForm.controls.suburb.patchValue(null);
  }

  /**
   * @summary checks if form values have been changed or not
   *
   * @private
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  private checkIfFormValueChanged(): void {
    this.changeAddressFormSubscription = this.changeAddressForm.valueChanges.subscribe(
      (changedFormValue: ICustomer) => {
        this.isFormValueChanged = !isEqual(this.initialFormValue, changedFormValue);
      }
    );
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
}
