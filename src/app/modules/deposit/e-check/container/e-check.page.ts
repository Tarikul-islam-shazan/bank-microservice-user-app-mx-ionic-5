import { Component, OnInit } from '@angular/core';
import { DepositMoneyEcheckFacade } from '../facade';
import { RegistrationFeePaymentType, Logger, IRegistrationFeeTransferableAccounts, IAccountsAmount } from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const log = new Logger('AppComponent');
@Component({
  selector: 'app-e-check',
  templateUrl: './e-check.page.html',
  styleUrls: ['./e-check.page.scss']
})
export class ECheckPage implements OnInit {
  subscriptionFee = 9.95;
  maxAmount = 509.95;
  totalAmount: string;
  depositFrom: FormGroup;
  navBarTitle: string;
  transferableAccounts: IRegistrationFeeTransferableAccounts;
  accountsAmount: { checkingAmount: string; savingsAmount: string } = { checkingAmount: '0', savingsAmount: '0' };
  constructor(private facade: DepositMoneyEcheckFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getRegistrationFeePaymentType();
    this.getRegistrationFeeTransferableAccounts();
    this.calculateTotal();
  }

  getRegistrationFeePaymentType() {
    this.navBarTitle =
      this.facade.getRegistrationFeePaymentType() === RegistrationFeePaymentType.DEBITCARD
        ? 'deposit.paystand-page.credit-title'
        : 'deposit.paystand-page.echeck-title';
  }

  getRegistrationFeeTransferableAccounts() {
    this.transferableAccounts = this.facade.getRegistrationFeeTransferableAccounts();
  }

  calculateTotal() {
    const _checkingAmount = parseFloat(this.accountsAmount.checkingAmount);
    const _savingsAmount = parseFloat(this.accountsAmount.savingsAmount);
    this.totalAmount = this.facade
      .getTotalAmount({ checkingAmount: _checkingAmount, savingsAmount: _savingsAmount }, this.subscriptionFee)
      .toFixed(2);
  }

  checkIsExceedMaxAmount(): boolean {
    if (parseFloat(this.totalAmount) > this.maxAmount) {
      return true;
    }
    return false;
  }

  continue() {
    this.facade.continue();
  }
}
