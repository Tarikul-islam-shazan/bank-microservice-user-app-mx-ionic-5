import { Injectable } from '@angular/core';
import { AccountType, IAccount, ITransaction, ITransactionQueries } from '@app/core';
import { AccountService } from '@app/core/services/account.service';
import { AccountTransaction, IAccountOverview } from '@app/dashboard/models';
import { CheckingState } from './checking-state';
import { map, take } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { TransactionDetailsService } from '@app/dashboard/services/transaction-details.service';
import { Router } from '@angular/router';
@Injectable()
export class CheckingFacade {
  constructor(
    private router: Router,
    private checkingState: CheckingState,
    private accountService: AccountService,
    private transactionDetailsService: TransactionDetailsService
  ) {
    this.initialize();
  }

  checkingAccount$: Observable<Partial<IAccount>> = this.checkingState.checkingAccount$;

  pendingTransactions$: Observable<ITransaction[]> = this.checkingState.pendingTransactions$;

  postedTransactions$: Observable<ITransaction[]> = this.checkingState.postedTransactions$;

  pendingAmount$: Observable<number> = this.checkingState.pendingTransactions$.pipe(
    map((pendingTransactions: ITransaction[]) => {
      return pendingTransactions.reduce((amountSum, account) => {
        return amountSum + account.amount;
      }, 0);
    })
  );

  public accountOverview$: Observable<IAccountOverview[]> = combineLatest([
    this.checkingState.checkingAccount$,
    this.pendingAmount$.pipe(take(1)) // The value of total pending amount should be taken only once. Should not be recalculated on search.
  ]).pipe(
    map(([checkingAccount, pendingAmount]: [IAccount, number]) => {
      const accountOverview = [
        {
          title: 'dashboard-module.dda-transaction-page.balance-text',
          amount: checkingAccount.currentBalance
        },
        {
          title: 'dashboard-module.dda-transaction-page.pending-text',
          amount: pendingAmount
        },
        {
          title: 'dashboard-module.dda-transaction-page.available-text',
          amount: checkingAccount.availableBalance
        }
      ];
      return accountOverview;
    })
  );

  showHide$: Observable<boolean> = this.checkingState.showHide$;

  initialize() {
    const accounts = this.accountService.getCachedAccountSummary();
    const checkingAccount = accounts.find((account: IAccount) => account.accountType === AccountType.DDA) as IAccount;
    this.checkingState.setCheckingAccountState(checkingAccount);
    this.transactionDetailsService.setAccount(checkingAccount);
    this.getTransactions(checkingAccount.accountId);
  }

  getTransactions(accountId: string) {
    this.accountService
      .getTransactions(accountId, { accountType: AccountType.DDA })
      .subscribe((transactions: AccountTransaction) => {
        this.checkingState.setPendingTransactionsState(transactions.pendingTransactions);
        this.checkingState.setPostedTransactionsState(transactions.postedTransactions);
      });
  }

  /**
   * This method hits the accountService with transactionQueries for the advance search result
   * Date: March 06, 2020
   * Developer: M G Muntaqeem <muntaqeem@bs-23.net>
   */
  getSearchedTransactions(transactionQueries: ITransactionQueries) {
    const accounts = this.accountService.getCachedAccountSummary();
    const { accountId } = accounts.find((account: IAccount) => account.accountType === AccountType.DDA) as IAccount;
    this.accountService.getTransactions(accountId, transactionQueries).subscribe((transactions: AccountTransaction) => {
      this.checkingState.setPostedTransactionsState((transactions as unknown) as ITransaction[]);
    });
  }

  showHideTransactions() {
    this.checkingState.setShowHideState(!this.checkingState.getShowHideValue());
  }

  async selectedTransaction(transaction: ITransaction): Promise<void> {
    await this.transactionDetailsService.setTransaction(transaction).then(() => {
      this.router.navigate(['/home/transaction-details']);
    });
  }
}
