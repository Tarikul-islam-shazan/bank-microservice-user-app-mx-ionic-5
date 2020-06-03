import { Injectable } from '@angular/core';
import { ITransfer, TransferFor } from '@app/move-money/internal-transfer/models';
import { InternalTransferService, AccountService } from '@app/core/services';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { Router } from '@angular/router';
import { TransferService } from '@app/move-money/internal-transfer/services';
import { TranslateService } from '@ngx-translate/core';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { CancelTransferSuccessModalComponent } from '@app/move-money/internal-transfer/components/cancel-transfer-success-modal';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class CancelTransferFacade {
  fromAccount: IAccount;
  toAccount: IAccount;
  transfer: Partial<ITransfer>;

  constructor(
    private internalTransferService: InternalTransferService,
    private router: Router,
    private accountService: AccountService,
    private transferService: TransferService,
    private translate: TranslateService,
    private modalService: ModalService,
    private analytics: AnalyticsService
  ) {}

  // Delete a Scheduled  transfer
  deleteInternalTransfer() {
    const { transferId, transferType, debtorAccount } = this.transfer;
    this.internalTransferService.deleteInternalTransfer({ transferId, transferType, debtorAccount }).subscribe(() => {
      this.analytics.logEvent(AnalyticsEventTypes.ScheduleTransferDeleted);
      this.deleteSuccess(this.transfer);
    });
  }

  // Delete internal transfer success, show the success modal.
  // When modal closed we redirect to move money page or scheduled transfer page based on transfer type
  async deleteSuccess(transferResponse: Partial<ITransfer>) {
    const componentProps: IMeedModalContent = {
      data: transferResponse,
      onDidDismiss: onDidDismissResponse => {
        const { data: hasResponseData } = onDidDismissResponse;
        this.resetTransfer();
        /**
         * When transfer success modal closed, we always return to move money tab [by default].
         */
        this.router.navigate(['dashboard/move-money']);
      }
    };
    await this.modalService.openModal(CancelTransferSuccessModalComponent, componentProps);
  }

  // initialize the cancel transfer page data, get the transfer ready for final submission
  initialize() {
    this.transfer = this.transferService.getTransfer();
    const accounts = this.accountService.getCachedAccountSummary() as IAccount[];
    this.fromAccount = accounts.find((account: IAccount) => account.accountId === this.transfer.debtorAccount);
    this.toAccount = accounts.find((account: IAccount) => account.accountId === this.transfer.creditorAccount);
  }

  // If transfer done we reset the transfer service object
  resetTransfer() {
    this.transferService.resetTransferService();
  }

  // Account type translation
  accountTypeTranslation(accountType: AccountType) {
    switch (accountType) {
      case AccountType.DDA:
        return this.translate.instant('move-money-module.internal-transfer.cancel-transfer.checking-text');
      case AccountType.SSA:
        return this.translate.instant('move-money-module.internal-transfer.cancel-transfer.savings-text');
      case AccountType.LOC:
        return this.translate.instant('move-money-module.internal-transfer.cancel-transfer.line-of-credit-text');
    }
  }
  // Is active account based on account type and transferFor [from account or to account].
  // change UI current account icon based on account switch
  isActiveAccount(accountType: AccountType, transferFor: string): boolean {
    if (this.fromAccount && this.toAccount) {
      if (transferFor === TransferFor.FromAccount) {
        return this.fromAccount.accountType === accountType;
      }
      if (transferFor === TransferFor.ToAccount) {
        return this.toAccount.accountType === accountType;
      }
    }
  }

  get accountType(): typeof AccountType {
    return AccountType;
  }

  get transferFor(): typeof TransferFor {
    return TransferFor;
  }

  /**
   *
   *
   * @param {string} data
   * @returns {string}
   * @memberof CancelTransferFacade
   */
  translation(data: string): string {
    return this.translate.instant(data);
  }
}
