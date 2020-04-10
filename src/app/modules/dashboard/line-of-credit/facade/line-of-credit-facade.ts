import { Injectable } from '@angular/core';
import { AccountType, IAccount, ITransaction, ITransactionQueries } from '@app/core';
import { AccountTransaction, IAccountOverview } from '@app/dashboard/models';
import { AccountService } from '@app/core/services/account.service';
import { LineOfCreditState } from './line-of-credit-state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class LineOfCreditFacade {
  constructor(
    private accountService: AccountService,
    private lineOfCreditState: LineOfCreditState,
    private analytics: AnalyticsService
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
    this.accountService.getTransactions(accountId).subscribe((transactions: AccountTransaction) => {
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

  makePayment() {
    this.analytics.logEvent(AnalyticsEventTypes.TransferStarted, { source: 'loc-payment' });
  }
}
