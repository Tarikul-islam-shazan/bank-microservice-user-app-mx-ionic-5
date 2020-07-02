import { AddPayeeFacade } from '../facade';
import { BillPayeeType, CommonValidators, IBillPayee, IBiller } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-payee',
  templateUrl: './add-payee.page.html',
  styleUrls: ['./add-payee.page.scss']
})
export class AddPayeePage implements OnInit {
  addPayeeForm: FormGroup;
  biller: IBiller;
  accountNumberMaxLength = 50;
  constructor(private facade: AddPayeeFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.biller = this.facade.getBiller();
    this.initForm();
    // this.getPayeeDetails();
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
        accountNumber: ['', Validators.required],
        confirmAccountNumber: ['', Validators.required]
      },
      {
        validator: CommonValidators.compareTwoFields('accountNumber', 'confirmAccountNumber')
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
    const { accountNumber } = this.addPayeeForm.value;
    const billPayee = {
      name: this.biller.name,
      accountNumber
    };
    this.facade.continue(billPayee);
  }
}
