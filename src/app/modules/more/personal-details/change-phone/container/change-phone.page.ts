/**
 * * Change Phone number
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 * Developer: Abdul Baten <md.abdul@brainstation23.com>
 * Date: 5 Feb, 2020
 * Date: 02 Apr, 2020
 *
 * @export
 * @class ChangePhonePage
 * @implements {OnInit}
 */

import { ChangePhoneFacade } from '../facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'change-phone',
  templateUrl: './change-phone.page.html',
  styleUrls: ['./change-phone.page.scss']
})
export class ChangePhonePage implements OnDestroy, OnInit {
  changePhoneForm: FormGroup;
  changePhoneFormSubscription: Subscription;
  isFormValueChanged = false;
  phoneNumberMinLength = 9;
  phoneNumberMaxLength = 20;

  constructor(private facade: ChangePhoneFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initChangePhoneForm();
    this.checkIfFormValueChanged();
  }

  /**
   * @summary initializes the form
   *
   * @private
   * @returns {void}
   * @memberOf ChangePhonePage
   */
  private initChangePhoneForm(): void {
    const { mobilePhone } = this.facade.customer;
    this.changePhoneForm = this.formBuilder.group({
      mobilePhone: [
        mobilePhone,
        [
          Validators.required,
          Validators.minLength(this.phoneNumberMinLength),
          Validators.maxLength(this.phoneNumberMaxLength)
        ]
      ]
    });
  }

  /**
   * @summary checks if form values have been changed or not
   *
   * @private
   * @returns {void}
   * @memberOf ChangePhonePage
   */
  private checkIfFormValueChanged(): void {
    const { mobilePhone = '' } = this.facade.customer;
    this.changePhoneFormSubscription = this.changePhoneForm.valueChanges.subscribe((changedFormValue: FormData) => {
      this.isFormValueChanged = !isEqual({ mobilePhone }, changedFormValue);
    });
  }

  /**
   * @summary colses the modal
   *
   * @returns {void}
   * @memberOf ChangePhonePage
   */
  dismiss(): void {
    this.facade.dismissModal();
  }

  /**
   * @summary opens OTP modal
   *
   * @returns {void}
   * @memberOf ChangePhonePage
   */
  save(): void {
    if (this.changePhoneForm.valid) {
      const { value } = this.changePhoneForm;
      this.facade.save(value);
    }
  }

  ngOnDestroy() {
    if (this.changePhoneFormSubscription) {
      this.changePhoneFormSubscription.unsubscribe();
    }
  }
}
