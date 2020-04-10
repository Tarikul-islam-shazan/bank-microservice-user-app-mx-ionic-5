/**
 * Facade: Internal transfer facade
 * Details: move between account facade
 * Date: March 7, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Injectable } from '@angular/core';
import { Logger, AccountService } from '@app/core/services';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { ITransfer, TransferFor } from '@app/move-money/internal-transfer/models';
import { Router } from '@angular/router';
import { CreateTransferService } from '@app/move-money/internal-transfer/services';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@app/shared/services/modal.service';
import { ScheduleTypeModalComponent } from '@app/move-money/internal-transfer/components';
const log = new Logger('TransfTransferFacadeer');

@Injectable()
export class InternalTransferFacade {
  fromAccount: IAccount;
  toAccount: IAccount;
  transfer: Partial<ITransfer>;

  isAmountExceedAvailableBalance = false;

  // If user want to modify the schedule transfer, we enable edit action in inputs fields
  modifiedScheduleTransfer = false;

  constructor(
    private createTransferService: CreateTransferService,
    private actionSheetCtrl: ActionSheetController,
    private accountService: AccountService,
    private translate: TranslateService,
    private modalService: ModalService,
    private router: Router
  ) {}

  initialize() {
    this.transfer = this.createTransferService.getTransfer();
    this.accountService.fetchAccountSummary().subscribe(success => {
      this.accountSwitch(AccountType.DDA, AccountType.SSA);
    });
  }

  goToConfirm() {
    this.router.navigate(['move-money/internal-transfer/confirm-details']);
  }

  goToCancel() {
    this.router.navigate(['move-money/internal-transfer/cancel-transfer']);
  }

  // On amount input change we check the validation for available balance check
  onInputAmountChange() {
    if (this.fromAccount) {
      if (this.transfer.amount > this.fromAccount.availableBalance) {
        this.isAmountExceedAvailableBalance = true;
      } else {
        this.isAmountExceedAvailableBalance = false;
      }
    }
  }

  get accountType(): typeof AccountType {
    return AccountType;
  }

  get transferFor(): typeof TransferFor {
    return TransferFor;
  }

  // Is active account based on account type and transferFor [from account or to account].
  // change UI current account icon based on account switch
  isActiveAccount(accountType: AccountType, transferFor: string): boolean {
    if (transferFor === TransferFor.FromAccount) {
      return this.fromAccount.accountType === accountType;
    }
    if (transferFor === TransferFor.ToAccount) {
      return this.toAccount.accountType === accountType;
    }
  }
  // translate the text for DDA to saving
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

  // Open schedule modal for updating the transfer frequency and date
  async openScheduleModal() {
    if (this.fromScheduledTransfers && !this.modifiedScheduleTransfer) {
      return false;
    }
    await this.modalService.openModal(ScheduleTypeModalComponent);
  }

  // Open From account action sheet for accounts chooser
  async openFromAccountActionSheet() {
    if (this.fromScheduledTransfers) {
      return false;
    }
    let actionSheetOptions = this.generateActionSheetButtons(TransferFor.FromAccount);
    if (this.fromAccount.accountType === AccountType.DDA || this.fromAccount.accountType === AccountType.SSA) {
      actionSheetOptions = actionSheetOptions.filter(optionButton => {
        return optionButton.role !== AccountType.LOC;
      });
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant(
        'move-money-module.internal-transfer.move-between-accounts.action-sheet.transfer-from-header'
      ),
      cssClass: 'account-type-action-sheet',
      mode: 'ios',
      buttons: actionSheetOptions
    });

    await actionSheet.present();
  }

  // Open To account action sheet for accounts chooser
  async openToAccountActionSheet() {
    if (this.fromScheduledTransfers) {
      return false;
    }
    let actionSheetOptions = this.generateActionSheetButtons(TransferFor.ToAccount);
    if (this.toAccount.accountType === AccountType.SSA || this.toAccount.accountType === AccountType.LOC) {
      actionSheetOptions = actionSheetOptions.filter(optionButton => {
        return optionButton.role !== AccountType.DDA;
      });
    }
    if (this.toAccount.accountType === AccountType.DDA) {
      actionSheetOptions = actionSheetOptions.filter(optionButton => {
        return optionButton.role !== AccountType.LOC && optionButton.role !== AccountType.SSA;
      });
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant(
        'move-money-module.internal-transfer.move-between-accounts.action-sheet.transfer-to-header'
      ),
      cssClass: 'account-type-action-sheet',
      mode: 'ios',
      buttons: actionSheetOptions
    });

    await actionSheet.present();
  }

  // Generate dynamic actions sheet based on available accounts options and handle their events
  generateActionSheetButtons(transferFor: TransferFor) {
    const actionSheetOptions = [
      {
        icon: 'checking',
        text: this.translate.instant(
          'move-money-module.internal-transfer.move-between-accounts.action-sheet.checking-button'
        ),
        handler: () => {
          if (transferFor === TransferFor.FromAccount) {
            this.accountSwitch(AccountType.DDA, AccountType.SSA);
          }
        },
        role: AccountType.DDA
      },
      {
        icon: 'savings',
        text: this.translate.instant(
          'move-money-module.internal-transfer.move-between-accounts.action-sheet.saving-button'
        ),
        handler: () => {
          if (transferFor === TransferFor.FromAccount) {
            this.accountSwitch(AccountType.SSA, AccountType.DDA);
          }
          if (transferFor === TransferFor.ToAccount) {
            this.accountSwitch(AccountType.DDA, AccountType.SSA);
          }
        },
        role: AccountType.SSA
      },
      {
        icon: 'loc',
        text: this.translate.instant(
          'move-money-module.internal-transfer.move-between-accounts.action-sheet.line-of-credit-button'
        ),
        role: AccountType.LOC,
        handler: () => {
          if (transferFor === TransferFor.ToAccount) {
            this.accountSwitch(AccountType.DDA, AccountType.LOC);
          }
        }
      },
      {
        text: this.translate.instant(
          'move-money-module.internal-transfer.move-between-accounts.action-sheet.cancel-button'
        ),
        role: 'cancel'
      }
    ];
    return actionSheetOptions;
  }

  // Switch from and current account and update transfer
  accountSwitch(fromAccount: AccountType, toAccount: AccountType) {
    const accounts = this.accountService.getCachedAccountSummary() as IAccount[];
    this.fromAccount = accounts.find((account: IAccount) => account.accountType === fromAccount);
    this.toAccount = accounts.find((account: IAccount) => account.accountType === toAccount);
    this.transfer = {
      ...this.transfer,
      debtorAccount: this.fromAccount.accountId,
      creditorAccount: this.toAccount.accountId
    };
    this.createTransferService.setTransfer(this.transfer);
  }

  // Get to know is from schedule transfer, we are re-using the same component for both
  // move between account or scheduled transfer modify
  get fromScheduledTransfers(): boolean {
    return this.createTransferService.isFromScheduledTransfers();
  }

  // If user want to edit a schduled transfer
  editScheduledTransfe() {
    this.modifiedScheduleTransfer = true;
  }
  // Reset transfer object when page/ componet destroy
  resetTransferService() {
    this.modifiedScheduleTransfer = false;
    this.createTransferService.resetTransferService();
  }
}
