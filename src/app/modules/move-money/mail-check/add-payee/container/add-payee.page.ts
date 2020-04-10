import { AddPayeeFacade } from '../facade';
import { BillPayeeType, CommonValidators, IBillPayee } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-payee',
  templateUrl: './add-payee.page.html',
  styleUrls: ['./add-payee.page.scss']
})
export class AddPayeePage implements OnInit {
  addPayeeForm: FormGroup;
  billPayee: IBillPayee;
  billPayeeType = BillPayeeType;

  accountNumberMaxLength = 50;

  constructor(private facade: AddPayeeFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getPayeeDetails();
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
        fullName: ['', [Validators.required, CommonValidators.alphaNumericWithSpace]],
        nickName: [''],
        accountNumber: ['', Validators.required],
        confirmAccountNumber: ['', Validators.required],
        type: ['', Validators.required]
      },
      {
        validator: CommonValidators.compareTwoFields('accountNumber', 'confirmAccountNumber')
      }
    );
  }

  /**
   * @sumamry patches addPayeeForm values
   *
   * @private
   * @param {IBillPayee} billPayee
   * @memberOf AddPayeePage
   */
  private patchFormValue(billPayee: IBillPayee): void {
    this.addPayeeForm.controls.fullName.patchValue(billPayee.fullName);
    this.addPayeeForm.controls.nickName.patchValue(billPayee.fullName);
    this.addPayeeForm.controls.accountNumber.patchValue(billPayee.accountNumber);
    this.addPayeeForm.controls.type.patchValue(billPayee.type);
  }

  /**
   * @summary get payee details from facade
   *
   * @returns {void}
   * @memberOf AddPayeePage
   */
  getPayeeDetails(): void {
    this.billPayee = this.facade.getBillPayee();
    if (this.billPayee.payeeId) {
      this.facade.getPayeeDetails().subscribe((billPayee: IBillPayee) => {
        this.patchFormValue(billPayee);
      });
    }
  }
  /**
   * @sumamry handle continue button click.
   *
   * @returns {void}
   * @memberOf AddPayeePage
   */
  continue(): void {
    const { fullName, nickName, accountNumber, type } = this.addPayeeForm.value;
    const billPayee = {
      fullName: fullName.trim(),
      nickName: nickName.trim(),
      accountNumber: `${accountNumber}`,
      type
    };
    this.facade.continue(billPayee);
  }

  /**
   * @summary deletes payee
   *
   * @returns {void}
   * @memberOf AddPayeePage
   */
  delete(): void {
    this.facade.delete();
  }

  /**
   * @summary goes back to previous page.
   *
   * @returns {void}
   * @memberOf AddPayeePage
   */
  cancel(): void {
    this.facade.cancel();
  }
}
