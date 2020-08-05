import * as moment from 'moment';
import { BillPaymentFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { CommonValidators } from '@app/core/util/common-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBillPayee, IBillPayment } from '@app/core/models/dto';

@Component({
  selector: 'bill-payment',
  templateUrl: './bill-payment.page.html',
  styleUrls: ['./bill-payment.page.scss']
})
export class BillPaymentPage implements OnInit {
  billPayee: IBillPayee;
  billPayment: IBillPayment;
  billPaymentForm: FormGroup;
  constructor(public facade: BillPaymentFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.billPayee = this.facade.getBillPayee();
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
      amount: [
        '',
        [Validators.required, CommonValidators.minimumTransferAmount(1), CommonValidators.maximumTransferAmount(1000)]
      ]
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
    const amount = this.convertPaymentAmountToNumber(this.billPaymentForm.value.amount);
    const executionDate = moment.now();
    const paymentInfo = Object.assign({
      amount,
      executionDate,
      payeeId: this.billPayee._id,
      accountNumber: this.billPayee.accountNumber
    });
    this.facade.payBill(paymentInfo);
  }

  cancelPayment(): void {
    this.facade.navigateToPage('/move-money/pay-bills/bill-pay');
  }
}
