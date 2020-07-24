import { EditPayeeFacade } from '../facade';
import { CommonValidators, IBillPayee } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared';

@Component({
  selector: 'mbc-edit-payee',
  templateUrl: './edit-payee.page.html',
  styleUrls: ['./edit-payee.page.scss']
})
export class EditPayeePage implements OnInit {
  editPayeeForm: FormGroup;
  billPayee: IBillPayee;
  isAccountNumberChanged: boolean;
  numberOnly: IinputOption;
  constructor(private facade: EditPayeeFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.billPayee = this.facade.getBillPayee();
    this.initForm();
    this.accountNumberChangedInit();
  }

  /**
   * @summary initializes and builds editPayeeForm
   *
   * @private
   * @returns {void}
   * @memberOf editPayeePage
   */
  private initForm(): void {
    this.numberOnly = {
      type: InputFormatType.ONLY_NUMBER
    };
    this.editPayeeForm = this.formBuilder.group(
      {
        name: [{ value: this.billPayee.biller.name, disabled: true }, [Validators.required]],
        accountNumber: [this.billPayee.accountNumber, Validators.required],
        confirmAccountNumber: ['', Validators.required]
      },
      {
        validator: CommonValidators.compareTwoFields('accountNumber', 'confirmAccountNumber')
      }
    );
  }

  accountNumberChangedInit(): void {
    this.editPayeeForm.get('accountNumber').valueChanges.subscribe(accountNumber => {
      this.isAccountNumberChanged = accountNumber !== this.billPayee.accountNumber;
    });
  }

  /**
   * @sumamry handle continue button click.
   *
   * @returns {void}
   * @memberOf editPayeePage
   */
  gotoNext(): void {
    const { accountNumber } = this.editPayeeForm.value;
    this.billPayee.accountNumber = accountNumber;
    this.facade.continue(this.billPayee);
  }
}
