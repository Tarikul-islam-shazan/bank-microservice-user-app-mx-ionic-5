import { AddTopUpPayeeFacade } from '../facade';
import { CommonValidators, IBiller } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared';

@Component({
  selector: 'add-top-up-payee',
  templateUrl: './add-top-up-payee.page.html',
  styleUrls: ['./add-top-up-payee.page.scss']
})
export class AddTopUpPayeePage implements OnInit {
  addPayeeForm: FormGroup;
  biller: IBiller;
  phoneNumber: IinputOption;
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
    this.phoneNumber = {
      type: InputFormatType.PHONE_MASK
    };
    this.addPayeeForm = this.formBuilder.group(
      {
        name: [{ value: this.biller.name, disabled: true }, [Validators.required]],
        phoneNumber: ['', Validators.required],
        confirmPhoneNumber: ['', Validators.required]
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
      biller: this.biller,
      phoneNumber
    };
    this.facade.continue(billPayee);
  }
}
