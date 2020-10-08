import { AddTopUpPayeeFacade } from '../facade';
import { CommonValidators, IBiller } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared/directives';

@Component({
  selector: 'add-top-up-payee',
  templateUrl: './add-top-up-payee.page.html',
  styleUrls: ['./add-top-up-payee.page.scss']
})
export class AddTopUpPayeePage implements OnInit {
  addPayeeForm: FormGroup;
  biller: IBiller;
  phoneNumberInput: IinputOption;
  phoneNumberLength = 10;
  constructor(private facade: AddTopUpPayeeFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.biller = this.facade.getBiller();
    this.initForm();
  }

  /**
   * @summary initializes and builds addPayeeForm
   *
   * @private
   * @returns {void}
   * @memberOf AddPayeePage
   */
  private initForm(): void {
    this.phoneNumberInput = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: this.phoneNumberLength
    };
    this.addPayeeForm = this.formBuilder.group(
      {
        name: [{ value: this.biller.name, disabled: true }, [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
        confirmPhoneNumber: ['', [Validators.required, Validators.pattern('\\d{10}')]]
      },
      {
        validator: CommonValidators.compareTwoFields('phoneNumber', 'confirmPhoneNumber')
      }
    );
  }

  /**
   * @sumamry handle continue button click.
   *
   * @returns {void}
   * @memberOf AddPayeePage
   */
  gotoNext(): void {
    const { phoneNumber } = this.addPayeeForm.value;
    const billPayee = {
      biller: this.biller.id,
      phoneNumber
    };
    this.facade.continue(billPayee);
  }
}
