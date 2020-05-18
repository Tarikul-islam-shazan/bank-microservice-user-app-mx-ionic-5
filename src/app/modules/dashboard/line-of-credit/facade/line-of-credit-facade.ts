import { Injectable } from '@angular/core';
import { AccountType, IAccount, ITransaction, ITransactionQueries } from '@app/core';
import { AccountTransaction, IAccountOverview } from '@app/dashboard/models';
import { AccountService } from '@app/core/services/account.service';
import { LineOfCreditState } from './line-of-credit-state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { InterestRateService } from '@app/dashboard/services/interest-rate.service';

@Injectable()
export class LineOfCreditFacade {
  constructor(
    private accountService: AccountService,
    private lineOfCreditState: LineOfCreditState,
    private analytics: AnalyticsService,
    private modalService: ModalService,
    private interestRateService: InterestRateService
  ) {
    this.initialize();
  }
  lineOfCreditAccount$: Observable<Partial<IAccount>> = this.lineOfCreditState.lineOfCreditAccount$;

  pendingTransactions$: Observable<ITransaction[]> = this.lineOfCreditState.pendingTransactions$;

  postedTransactions$: Observable<ITransaction[]> = this.lineOfCreditState.postedTransactions$;

  pendingAmount$: Observable<number> = this.lineOfCreditState.pendingTransactions$.pipe(
    map((pendingTransactions: ITransaction[]) => {
      return pendingTransactions.reduce((amountSum, account) => {
        return amountSum + account.amount;
      }, 0);
    })
  );

  accountOverview$: Observable<IAccountOverview[]> = this.lineOfCreditState.lineOfCreditAccount$.pipe(
    map((lineOfCreditAccount: IAccount) => {
      const accountOverview = [
        {
          title: 'dashboard-module.loc-transaction-page.credit-limit-text',
          amount: lineOfCreditAccount.availableBalance + lineOfCreditAccount.balanceOwed
        },
        {
          title: 'dashboard-module.loc-transaction-page.balance-text',
          amount: lineOfCreditAccount.currentBalance
        },
        {
          title: 'dashboard-module.loc-transaction-page.available-text',
          amount: lineOfCreditAccount.availableBalance
        }
      ];
      return accountOverview;
    })
  );

  showHide$: Observable<boolean> = this.lineOfCreditState.showHide$;

  initialize() {
    const accounts = this.accountService.getCachedAccountSummary();
    const locAccount = accounts.find((account: IAccount) => account.accountType === AccountType.LOC) as IAccount;
    this.lineOfCreditState.setLineOfCreditAccountState(locAccount);
    this.setTransactionsSummary(locAccount.accountId);
  }

  setTransactionsSummary(accountId: string) {
    this.accountService
      .getTransactions(accountId, { accountType: AccountType.LOC })
      .subscribe((transactions: AccountTransaction) => {
        this.lineOfCreditState.setPendingTransactionsState(transactions.pendingTransactions);
        this.lineOfCreditState.setPostedTransactionsState(transactions.postedTransactions);
      });
  }

  /**
   * This method hits the accountService with transactionQueries for the advance search result
   * Date: March 06, 2020
   * Developer: M G Muntaqeem <muntaqeem@bs-23.net>
   */
  setSearchedTransactionsSummary(transactionQueries: ITransactionQueries) {
    transactionQueries = { ...transactionQueries, ...{ accountType: AccountType.LOC } };
    const accounts = this.accountService.getCachedAccountSummary();
    const { accountId } = accounts.find((account: IAccount) => account.accountType === AccountType.LOC) as IAccount;
    this.accountService.getTransactions(accountId, transactionQueries).subscribe((transactions: AccountTransaction) => {
      this.lineOfCreditState.setPendingTransactionsState(transactions.pendingTransactions);
      this.lineOfCreditState.setPostedTransactionsState(transactions.postedTransactions);
    });
  }

  showHideTransactions() {
    this.lineOfCreditState.setShowHideState(!this.lineOfCreditState.getShowHideValue());
  }

  /**
   * @method locAccount return accout of LOC
   *
   * @readonly
   * @type {IAccount}
   * @memberof LineOfCreditFacade
   */
  get locAccount(): IAccount {
    return this.accountService
      .getCachedAccountSummary()
      .find((account: IAccount) => account.accountType === AccountType.LOC);
  }

  /**
   * showing modal of a LOC clicking question option
   *
   * @memberof LineOfCreditFacade
   */
  async showModal() {
    this.interestRateService.getInterestRate(this.locAccount.accountId).subscribe(async (interestRate: number) => {
      const componentProps: IMeedModalContent = {
        contents: [
          {
            title: 'info-modal-module.line-of-credit-page.title',
            details: [
              'info-modal-module.line-of-credit-page.details.content1',
              'info-modal-module.line-of-credit-page.details.content2',
              'info-modal-module.line-of-credit-page.details.content3',
              'info-modal-module.line-of-credit-page.details.content4',
              'info-modal-module.line-of-credit-page.details.content5'
            ],
            values: { interestRate: interestRate.toString() }
          }
        ]
      };
      await this.modalService.openInfoModalComponent({ componentProps });
    });
  }
  makePayment() {
    this.analytics.logEvent(AnalyticsEventTypes.TransferStarted, { source: 'loc-payment' });
  }
}
