import { Injectable } from '@angular/core';
import {
  SignUpService,
  AccountId,
  RegistrationFee,
  RegistrationFeeRequest,
  AccountType,
  IAccountsAmount,
  IAccount,
  IRegistrationFeeTransferableAccounts
} from '@app/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class DepositMoneyEcheckFacade {
  private _deposits: RegistrationFee[];
  private _totalAmount: number;
  private transferableAccounts: IRegistrationFeeTransferableAccounts = {};
  constructor(private signupService: SignUpService, private router: Router, private analytics: AnalyticsService) {}

  get deposits(): RegistrationFee[] {
    return this._deposits;
  }

  set deposits(registrationFees: RegistrationFee[]) {
    this._deposits = registrationFees;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(amount: number) {
    this._totalAmount = amount;
  }

  getRegistrationFeePaymentType(): string {
    return this.signupService.signUpDirectDepositAccounts.registrationFeePaymentType;
  }
  getAccounts(): IAccount[] {
    return this.signupService.signUpDirectDepositAccounts.accounts;
  }

  getDeposits(): RegistrationFee[] {
    const accounts: IAccount[] = this.getAccounts();
    // const accounts: IAccount[] = this.getDummyAccountsData();
    let checkingAccount: RegistrationFee;
    let savingsAccount: RegistrationFee;

    accounts.forEach(account => {
      switch (account.accountType) {
        case AccountType.DDA:
          this.transferableAccounts.checking = account;
          checkingAccount = {
            accountNumber: account.accountNumber,
            accountType: account.accountType,
            amount: 0
          };
          break;
        case AccountType.SSA:
          this.transferableAccounts.savings = account;
          savingsAccount = {
            accountNumber: account.accountNumber,
            accountType: account.accountType,
            amount: 0
          };
          break;
      }
    });
    return (this.deposits = [checkingAccount, savingsAccount]);
  }

  getTotalAmount(amounts: IAccountsAmount, fee: number): number {
    this.deposits[0].amount = amounts.checkingAmount;
    this.deposits[1].amount = amounts.savingsAmount;
    return (this.totalAmount = this.deposits[0].amount + this.deposits[1].amount + fee);
  }

  getRegistrationFeeTransferableAccounts(): IRegistrationFeeTransferableAccounts {
    this.getDeposits();
    return this.transferableAccounts;
  }

  continue() {
    const registrationFeeRequest: RegistrationFeeRequest = {
      deposits: this.deposits,
      totalAmount: this.totalAmount,
      paymentMethod: this.getRegistrationFeePaymentType(),
      currency: '',
      paymentTrackingId: ''
    };
    this.signupService.signUpDirectDepositAccounts.registrationFeeRequest = registrationFeeRequest;
    this.analytics.logEvent(AnalyticsEventTypes.FundingAmountsSelected, {
      checking: this.deposits[0].amount,
      savings: this.deposits[1].amount
    });
    this.router.navigate(['signup/deposit/paystand']);
  }

  getDummyAccountsData(): IAccount[] {
    return [
      {
        accountId: '01E986BEC31F1EEA81C112D51AF9F92A',
        accountNumber: '00000000100016077',
        accountType: AccountType.LOC,
        balanceOwed: 0,
        currentBalance: 0,
        holdBalance: 0,
        availableBalance: 0,
        minimumDue: 0,
        routingNumber: '103913366'
      },
      {
        accountId: 'E3D77DBD031F1EEA81C112D51AF9F92A',
        accountNumber: '00000000100016059',
        accountType: AccountType.DDA,
        currentBalance: 0,
        holdBalance: 0,
        availableBalance: 0,
        minimumDue: 0,
        routingNumber: '103913366'
      },
      {
        accountId: 'E3D788BD431F1EEA81C112D51AF9F92A',
        accountNumber: '00000000100016068',
        accountType: AccountType.SSA,
        currentBalance: 0,
        holdBalance: 0,
        availableBalance: 0,
        minimumDue: 0,
        routingNumber: '103913366'
      }
    ];
  }
}
