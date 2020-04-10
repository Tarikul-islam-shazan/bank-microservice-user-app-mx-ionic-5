/**
 * Container: Change Address Modal Page
 * Details: Updating the customer  address, city, street or Zip code  .
 * Date: February 14,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 *
 */
import { ChangeAddressFacade } from '../facade';
import { CommonValidators, ICustomer } from '@app/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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

  constructor(
    private facade: ChangeAddressFacade,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getCustomer();
    this.initChangeAddressForm();
    this.getCountryStates();
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
    const { address, city, stateName, zipCode } = this.customer;
    this.changeAddressForm = this.formBuilder.group({
      address: [address, Validators.required],
      city: [city, Validators.required],
      state: [stateName, Validators.required],
      zipCode: [zipCode, CommonValidators.zipCodeValidation]
    });
  }

  /**
   * @summary patches selected state name
   *
   * @private
   * @param {string} stateName
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  private patchStateName(stateName: string): void {
    this.changeAddressForm.controls.state.patchValue(stateName);
  }

  /**
   * @summary gets country states
   *
   * @private
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  private getCountryStates(): void {
    this.facade.getCountryStates((stateName: string) => {
      this.patchStateName(stateName);
      this.initialFormValue = this.changeAddressForm.value;
      this.changeAddressForm.setErrors({ formValueNotChanged: true });
    });
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
   * @summary opens state modal
   *
   * @returns {void}
   * @memberOf ChangeAddressPage
   */
  openStateModal(): void {
    this.facade.openStateModal((stateName: string) => {
      this.patchStateName(stateName);
    });
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

  ngOnDestroy() {
    if (this.changeAddressFormSubscription) {
      this.changeAddressFormSubscription.unsubscribe();
    }
  }
}
