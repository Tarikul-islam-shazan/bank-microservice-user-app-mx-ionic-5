import { AddPayeeFacade } from '../facade';
import { CommonValidators, IBiller, REG_EX_PATTERNS } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared';

@Component({
  selector: 'add-payee',
  templateUrl: './add-payee.page.html',
  styleUrls: ['./add-payee.page.scss']
})
export class AddPayeePage implements OnInit {
  addPayeeForm: FormGroup;
  biller: IBiller;
  numberOnly: IinputOption;
  constructor(private facade: AddPayeeFacade, private formBuilder: FormBuilder) {}

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
    this.numberOnly = {
      type: InputFormatType.ONLY_NUMBER
    };
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
      biller: this.biller,
      accountNumber
    };
    this.facade.continue(billPayee);
  }
}
