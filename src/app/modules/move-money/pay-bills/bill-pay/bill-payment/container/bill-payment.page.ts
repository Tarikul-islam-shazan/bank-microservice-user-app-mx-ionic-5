import * as moment from 'moment';
import { BillPaymentFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { CommonValidators } from '@app/core/util/common-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBiller, IBillPayee, IBillPayment } from '@app/core/models/dto';

@Component({
  selector: 'bill-payment',
  templateUrl: './bill-payment.page.html',
  styleUrls: ['./bill-payment.page.scss']
})
export class BillPaymentPage implements OnInit {
  billPayee: IBillPayee;
  biller: IBiller;
  billPayment: IBillPayment;
  billPaymentForm: FormGroup;
  constructor(public facade: BillPaymentFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.facade.updatedAccountSummary();
    this.billPayee = this.facade.getBillPayee();
    this.biller = this.billPayee.biller as IBiller;
    this.initBillPaymentForm();
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
      amount: ['', [Validators.required, CommonValidators.minimumTransferAmount(1)]]
    });
  }

  /**
   * @summary convert payment amount from string to number by replacing
   * ',', '$'
   *
   * @param {string} amount
   * @returns {number}
   * @memberOf BillPaymentPage
   */
  convertPaymentAmountToNumber(amount: string): number {
    return Number(amount.replace(/[$,]/g, ''));
  }

  processPayment(): void {
    const amount = this.facade.convertPaymentAmountToNumber(this.billPaymentForm.value.amount);
    const executionDate = moment.now();
    const paymentInfo = Object.assign({
      amount,
      executionDate,
      biller: this.biller.id,
      accountNumber: this.billPayee.accountNumber,
      currency: this.biller.currency
    });
    this.facade.payBill(paymentInfo);
  }

  cancelPayment(): void {
    this.facade.navigateToPage('/move-money/pay-bills/bill-pay');
  }
}
