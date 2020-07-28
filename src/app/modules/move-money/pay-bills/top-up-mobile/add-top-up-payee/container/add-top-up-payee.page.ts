import { AddTopUpPayeeFacade } from '../facade';
import { CommonValidators, IBiller } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-top-up-payee',
  templateUrl: './add-top-up-payee.page.html',
  styleUrls: ['./add-top-up-payee.page.scss']
})
export class AddTopUpPayeePage implements OnInit {
  addPayeeForm: FormGroup;
  biller: IBiller;
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
      biller: this.biller,
      accountNumber: phoneNumber
    };
    this.facade.continue(billPayee);
  }
}
