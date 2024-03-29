import { Injectable } from '@angular/core';
import {
  ITransfer,
  ITransferSuccessModalObject,
  TransferFor,
  TransferFrequency
} from '@app/move-money/internal-transfer/models';
import { InternalTransferService, AccountService, IDropdownOption } from '@app/core/services';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { Router } from '@angular/router';
import { TransferSuccessModalComponent } from '@app/move-money/internal-transfer/components/transfer-success-modal';
import { TransferService } from '@app/move-money/internal-transfer/services';
import { TranslateService } from '@ngx-translate/core';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class ConfirmDetailsFacade {
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
    private readonly analyticsService: AnalyticsService
  ) {}

  // Submit internal transfer
  submitInternalTransfer() {
    if (!this.transfer.frequency) {
      this.transfer.frequency = this.internalTransferService.transferFrequency.find(
        (frequencyData: IDropdownOption) => {
          return frequencyData.value === TransferFrequency.Once;
        }
      ).value as TransferFrequency;
    }
    this.internalTransferService
      .submitInternalTransfer(this.transfer as ITransfer)
      .subscribe((transferResponse: ITransfer) => {
        this.analyticsService.logEvent(AnalyticsEventTypes.InternalTransferSubmitted);
        this.transferSuccess(transferResponse);
      });
  }

  // Update a Scheduled  transfer
  updateScheduledTransfer() {
    this.internalTransferService
      .modifyInternalTransfer(this.transfer as ITransfer)
      .subscribe((transferResponse: ITransfer) => {
        this.analyticsService.logEvent(AnalyticsEventTypes.ScheduleTransferModifyed);
        this.transferSuccess(transferResponse);
      });
  }

  // Transfer success, show the success modal.
  // When modal closed we redirect to move money page or scheduled transfer page based on transfer type
  async transferSuccess(transferResponse: ITransfer) {
    const transferModalData = {
      fromAccountType: this.fromAccount.accountType,
      toAccountType: this.toAccount.accountType,
      ...transferResponse
    } as ITransferSuccessModalObject;

    const componentProps: IMeedModalContent = {
      data: transferModalData,
      onDidDismiss: onDidDismissResponse => {
        const { data: hasResponseData } = onDidDismissResponse;
        this.resetTransfer();
        /**
         * When transfer success modal closed, we always return to move money tab [by default].
         * If user intent to view scheduled transfer we navigateByUrl to scheduled-transfers page
         * It will keep the navigate history.
         */
        this.router.navigate(['dashboard/move-money']).then(() => {
          if (hasResponseData) {
            const { scheduled } = hasResponseData;
            if (scheduled) {
              this.router.navigateByUrl('move-money/internal-transfer/scheduled-transfers');
            }
          }
        });
      }
    };
    await this.modalService.openModal(TransferSuccessModalComponent, componentProps);
  }

  // initialize the confirm page data, get the transfer ready for final submission
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

  backToEditScheduledModify() {
    this.router.navigate(['move-money/internal-transfer']);
  }

  // Account type translation
  accountTypeTranslation(accountType: AccountType) {
    switch (accountType) {
      case AccountType.DDA:
        return this.translate.instant('move-money-module.internal-transfer.confirm-details.checking-text');
      case AccountType.SSA:
        return this.translate.instant('move-money-module.internal-transfer.confirm-details.savings-text');
      case AccountType.LOC:
        return this.translate.instant('move-money-module.internal-transfer.confirm-details.line-of-credit-text');
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

  get fromScheduledTransfers(): boolean {
    return this.transferService.isFromScheduledTransfers();
  }
}
