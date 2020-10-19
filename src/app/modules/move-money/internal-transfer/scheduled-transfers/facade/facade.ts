import { Injectable } from '@angular/core';
import { Logger } from '@app/core/services';
import { InternalTransferService } from '@app/core/services/internal-transfer.service';
import { Router } from '@angular/router';
import { ITransfer, TransferFrequency } from '@app/move-money/internal-transfer/models';
import { TransferService } from '@app/move-money/internal-transfer/services';
import { AccountService } from '@app/core/services/account.service';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
const log = new Logger('ScheduledTransferFacade');
@Injectable()
export class ScheduledTransferFacade {
  transactionList: ITransfer[];
  constructor(
    private internalTransferService: InternalTransferService,
    private router: Router,
    private transferService: TransferService,
    private accountService: AccountService,
    private translate: TranslateService,
    private readonly analyticsService: AnalyticsService
  ) {}

  // Fetch Scheduled transfer list
  fetchScheduledTransfers(): void {
    this.internalTransferService.getInternalTransfers().subscribe((response: ITransfer[]) => {
      this.transactionList = response;
      this.analyticsService.logEvent(AnalyticsEventTypes.ScheduledTransfersLoaded);
    });
  }
  // Get the accounts, for query account type name
  get accounts(): IAccount[] {
    return this.accountService.getCachedAccountSummary();
  }
  // Accounts type name translation
  accountTypeTranslation(accountType: AccountType) {
    switch (accountType) {
      case AccountType.DDA:
        return this.translate.instant('move-money-module.internal-transfer.move-between-accounts.checking-text');
      case AccountType.SSA:
        return this.translate.instant('move-money-module.internal-transfer.move-between-accounts.savings-text');
      case AccountType.LOC:
        return this.translate.instant('move-money-module.internal-transfer.move-between-accounts.line-of-credit-text');
    }
  }
  // From Fetch Scheduled transfer list we get debtor creditor account ID, based on this we can find their account type [DDA,SSA,LOC]
  getAccountType(accountId: string) {
    return this.accountTypeTranslation(this.findAccountType(accountId));
  }

  findAccountType(accountId: string) {
    const accountinfo = this.accounts.find((account: IAccount) => account.accountId === accountId);
    return accountinfo.accountType;
  }
  // Go-to modify schedule transfer screen, we re-use the internal transfer component.
  gotoConfirmDetails(scheduledTransfer: ITransfer): void {
    this.internalTransferService.formAccountType = this.findAccountType(scheduledTransfer.debtorAccount);
    this.internalTransferService.toAccountType = this.findAccountType(scheduledTransfer.creditorAccount);
    this.transferService.setTransfer(scheduledTransfer);
    this.transferService.setFromScheduledTransfers(true);
    this.analyticsService.logEvent(AnalyticsEventTypes.ScheduledTransferSelected, { scheduledTransfer });
    this.router.navigate(['move-money/internal-transfer']);
  }

  get transferFrequency(): typeof TransferFrequency {
    return TransferFrequency;
  }
}
