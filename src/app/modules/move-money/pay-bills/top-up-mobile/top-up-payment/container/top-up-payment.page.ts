import * as moment from 'moment';
import { TopUpPaymentFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { CommonValidators } from '@app/core/util/common-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBiller, IBillPayee, IBillPayment } from '@app/core/models/dto';
import { IDropdownOption } from '@app/core/models/static-data';

@Component({
  selector: 'top-up-payment',
  templateUrl: './top-up-payment.page.html',
  styleUrls: ['./top-up-payment.page.scss']
})
export class TopUpPaymentPage implements OnInit {
  billPayee: IBillPayee;
  billPayment: IBillPayment;
  billPaymentForm: FormGroup;
  seletedAmount: IDropdownOption;
  constructor(public facade: TopUpPaymentFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.billPayee = this.facade.getBillPayee();
    this.initBillPaymentForm();
    this.facade.initAvailableDropDownAmountOptions();
  }

  /**
   * @summary initializes form.
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private initBillPaymentForm(): void {
    this.billPaymentForm = this.formBuilder.group({
      amount: [
        '',
        [Validators.required, CommonValidators.minimumTransferAmount(1), CommonValidators.maximumTransferAmount(1000)]
      ]
    });
  }

  getAmountCssClass() {
    return this.seletedAmount ? 'amount' : 'white-input';
  }

  openAmountOptionsModal() {
    this.facade.openAvailableAmountsModal(data => {
      this.seletedAmount = data;
      this.billPaymentForm.get('amount').setValue(this.seletedAmount.text);
    });
  }

  processPayment(): void {
    const amount = this.seletedAmount.value;
    const executionDate = moment.now();
    const paymentInfo = Object.assign({
      amount,
      executionDate,
      biller: (this.billPayee.biller as IBiller).id,
      phoneNumber: this.billPayee.phoneNumber,
      currency: (this.billPayee.biller as IBiller).currency
    });
    this.facade.payBill(paymentInfo);
  }

  cancelPayment(): void {
    this.facade.navigateToPage('/move-money/pay-bills/top-up-mobile');
  }
}
