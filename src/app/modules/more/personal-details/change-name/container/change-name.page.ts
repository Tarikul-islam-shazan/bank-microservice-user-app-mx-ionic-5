/**
 * Container: Change Namae Modal Page
 * Details: Updating the customer  First Name,Middlle Name or Last Name with a reason.
 * Date: February 17,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { ChangeNameFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomer } from '@app/core';
import { isEqual } from 'lodash';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { Subscription } from 'rxjs';

@Component({
  selector: 'change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss']
})
export class ChangeNamePage implements OnInit {
  changeNameForm: FormGroup;
  changeNameFormSubscription: Subscription;
  customer: ICustomer;
  isFormValueChanged = false;
  reasons: DropdownOption[] = [];
  selectedReason: DropdownOption;

  constructor(private facade: ChangeNameFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getNameChangeReasons();
    this.getCustomer();
    this.initChangeNameForm();
    this.checkIfFormValueChanged();
  }

  /**
   * @summary Issue: GMA-4289
   * @summary Convert static text to translation key.
   *
   * @private
   * @returns {void}
   * @memberOf ChangeNamePage
   */
  private getNameChangeReasons(): void {
    this.reasons = [
      {
        text: 'more-module.personal-details.change-full-name-modal.reasons-list.misspell',
        subText: 'more-module.personal-details.change-full-name-modal.reasons-list.misspell-document',
        value: 'MS'
      },
      {
        text: 'more-module.personal-details.change-full-name-modal.reasons-list.marriage',
        subText: 'more-module.personal-details.change-full-name-modal.reasons-list.marriage-document',
        value: 'MR'
      },
      {
        text: 'more-module.personal-details.change-full-name-modal.reasons-list.divoce',
        subText: 'more-module.personal-details.change-full-name-modal.reasons-list.divoce-document',
        value: 'DV'
      },
      {
        text: 'more-module.personal-details.change-full-name-modal.reasons-list.court',
        subText: 'more-module.personal-details.change-full-name-modal.reasons-list.court-document',
        value: 'CO'
      },
      {
        text: 'more-module.personal-details.change-full-name-modal.reasons-list.adoption',
        subText: 'more-module.personal-details.change-full-name-modal.reasons-list.adoption-document',
        value: 'AD'
      }
    ];
  }

  /**
   * @summary assigns customer data
   *
   * @private
   * @returns {void}
   * @memberOf ChangeNamePage
   */
  private getCustomer(): void {
    this.customer = this.facade.customer;
  }

  /**
   * @summary initializes the form
   *
   * @private
   * @returns {void}
   * @memberOf ChangeNamePage
   */
  private initChangeNameForm(): void {
    this.changeNameForm = this.formBuilder.group({
      firstName: [this.customer.firstName, [Validators.required]],
      middleName: [this.customer.middleName ? this.customer.middleName : ''],
      lastName: [this.customer.lastName, [Validators.required]],
      salutation: [this.customer.salutation],
      email: [this.customer.email],
      oldName: [this.customer.firstName + ' ' + this.customer.lastName],
      reason: ['', Validators.required],
      dateOfBirth: [this.customer.dateOfBirth],
      requiredDocument: ['']
    });
  }

  /**
   * @summary checks if form values have been changed or not
   *
   * @private
   * @returns {void}
   * @memberOf ChangeNicknamePage
   */
  private checkIfFormValueChanged(): void {
    this.changeNameFormSubscription = this.changeNameForm.valueChanges.subscribe((changedFormValue: ICustomer) => {
      const {
        firstName: customerFirstName,
        middleName: customerMiddleName,
        lastName: customerLastName
      } = this.customer;
      const { firstName: formFirstName, middleName: formMiddleName, lastName: formLastName } = changedFormValue;
      this.isFormValueChanged = !isEqual(
        { firstName: customerFirstName, middleName: customerMiddleName, lastName: customerLastName },
        { firstName: formFirstName, middleName: formMiddleName, lastName: formLastName }
      );
    });
  }

  /**
   * Issue: GMA-4289
   * Removing white space while typing name with any space.
   * 1.Get the value bay key name form  changeNameForm controls,
   * 2.Checking any white spce is exist.
   * 3. If white space is exist then replace with empty string
   * 4.Updating the value of form with patchValue of that key
   */
  removeSpaceFromName(fieldName: string): void {
    const fieldValue = this.changeNameForm.controls[fieldName].value;
    if (fieldName && REG_EX_PATTERNS.WHITE_SPACE.test(fieldValue)) {
      this.changeNameForm.patchValue({ [fieldName]: fieldValue.replace(REG_EX_PATTERNS.WHITE_SPACE, '') });
    }
  }

  /**
   * @summary Issue: GMA-4289
   * @summary Converting static text to translated text.
   *
   * @returns {void}
   * @memberOf ChangeNamePage
   */
  openModal(): void {
    this.facade.openReasonModal(this.reasons, (response: any) => {
      this.selectedReason = response;
      this.changeNameForm.controls.reason.patchValue(this.selectedReason.text);
      this.changeNameForm.controls.requiredDocument.patchValue(this.selectedReason.subText);
    });
  }

  /**
   * @summary closes modal
   *
   * @returns {void}
   * @memberOf ChangeNamePage
   */
  dismiss(): void {
    this.facade.dismissModal();
  }

  /**
   * @summary opens documents modal
   *
   * @returns {void}
   * @memberOf ChangeNamePage
   */
  next(): void {
    // Implemented new way to open a modal and pass data
    this.facade.openDocumentsModal(this.changeNameForm.value);
  }
}
