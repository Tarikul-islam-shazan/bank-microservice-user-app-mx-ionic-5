/**
 * Facade: Internal transfer facade
 * Details: move between account facade
 * Date: March 7, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Injectable } from '@angular/core';
import { Logger, AccountService, InternalTransferService } from '@app/core/services';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { ITransfer, TransferFor, LocPaymentOption } from '@app/move-money/internal-transfer/models';
import { Router } from '@angular/router';
import { TransferService } from '@app/move-money/internal-transfer/services';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@app/shared/services/modal.service';
import { ScheduleTypeModalComponent } from '@app/move-money/internal-transfer/components';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
const log = new Logger('TransfTransferFacadeer');

@Injectable()
export class InternalTransferFacade {
  fromAccount: IAccount;
  toAccount: IAccount;
  transfer: Partial<ITransfer>;
  isAmountExceedAvailableBalance = false;
  isLocPaymentOptionSelected = false;
  // If user want to modify the schedule transfer, we enable edit action in inputs fields
  modifiedScheduleTransfer = false;
  isAmoutInputFieldHidden;
  locPaymentOption: typeof LocPaymentOption = LocPaymentOption;
  constructor(
    private transferService: TransferService,
    private actionSheetCtrl: ActionSheetController,
    private accountService: AccountService,
    private translate: TranslateService,
    private modalService: ModalService,
    private internalTransferService: InternalTransferService,
    private router: Router,
    private readonly analyticsService: AnalyticsService
  ) {}

  initialize(): void {
    this.isAmoutInputFieldHidden = true;
    this.transfer = this.transferService.getTransfer();
    // Setting fromAccount and toAccount  Type ;
    if (this.internalTransferService.formAccountType && this.internalTransferService.toAccountType) {
      this.accountSwitch(this.internalTransferService.formAccountType, this.internalTransferService.toAccountType);
    } else {
      // Default fromAccount and toAccount Type;
      this.accountSwitch(AccountType.DDA, AccountType.SSA);
    }
    this.accountService.fetchAccountSummary().subscribe(accounts => {
      if (accounts) {
        accounts.map(account => {
          if (account.accountType === this.fromAccount.accountType) {
            this.fromAccount = account;
          }
          if (account.accountType === this.toAccount.accountType) {
            this.toAccount = account;
          }
        });
      }
    });
    this.internalTransferService.loadTransferFrequency();
  }

  goToConfirm() {
    this.router.navigate(['move-money/internal-transfer/confirm-details']);
  }

  goToCancel() {
    this.analyticsService.logEvent(AnalyticsEventTypes.InternalTransferCancelled);
    this.router.navigate(['move-money/internal-transfer/cancel-transfer']);
  }

  // On amount input change we check the validation for available balance check
  onInputAmountChange(): void {
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
        icon: 'ios-checking', // GMA-4251 wrong icon showing
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
        icon: 'ios-savings', // GMA-4251 wrong icon showing
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
          this.isAmoutInputFieldHidden = true;
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
    this.isLocPaymentOptionSelected = false;
    if (!this.fromScheduledTransfers) {
      this.transfer.amount = 0;
    }
    this.transfer = {
      ...this.transfer,
      debtorAccount: this.fromAccount.accountId,
      creditorAccount: this.toAccount.accountId
    };

    this.transferService.setTransfer(this.transfer);
  }

  // Get to know is from schedule transfer, we are re-using the same component for both
  // move between account or scheduled transfer modify
  get fromScheduledTransfers(): boolean {
    return this.transferService.isFromScheduledTransfers();
  }

  // If user want to edit a schduled transfer
  editScheduledTransfe() {
    this.modifiedScheduleTransfer = true;
  }
  // Reset transfer object when page/ componet destroy
  resetTransferService(): void {
    this.modifiedScheduleTransfer = false;
    // Resetting default fromAccount and toAccount Type;
    this.internalTransferService.formAccountType = AccountType.DDA;
    this.internalTransferService.toAccountType = AccountType.SSA;
    this.transferService.resetTransferService();
  }

  /**
   * Ticket:MM2-359
   * Date: June 09, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A function that set transfer amount as LocPaymentOption
   * @param {LocPaymentOption} paymentOption
   * @memberof InternalTransferFacade
   */
  setLocPaymentTransferAmount(paymentOption: LocPaymentOption): void {
    this.isAmoutInputFieldHidden = false;
    switch (paymentOption) {
      case LocPaymentOption.Minimum:
        this.transfer.amount = Number(parseFloat(String(this.toAccount.minimumPaymentDue)).toFixed(2));
        break;
      case LocPaymentOption.Full:
        this.transfer.amount = Number(parseFloat(String(this.toAccount.balanceOwed)).toFixed(2));
        break;
      case LocPaymentOption.Custom:
        this.transfer.amount = 0;
        break;
    }
    this.analyticsService.logEvent(AnalyticsEventTypes.InternalTransferPaymentOptionSelected);
    this.isLocPaymentOptionSelected = true;
  }
  /**
   * Ticket:MM2-359
   * Date: June 09, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A fuction to check is ExceedLocFullPayment;
   * @returns {boolean}
   * @memberof InternalTransferFacade
   */
  isAmountExceedLocFullPayment(): boolean {
    return (
      this.toAccount &&
      this.toAccount.accountType === AccountType.LOC &&
      Number(this.transfer.amount) > this.toAccount.balanceOwed
    );
  }

  /**
   * Ticket:MM2-359
   * Date: June 09, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A getter to check  AccountType is LOC & PaymentOptionSelected is clicked onec
   * @readonly
   * @type {boolean}
   * @memberof InternalTransferFacade
   */
  get isShowLocPaymentSelectionOption(): boolean {
    return this.toAccount.accountType === AccountType.LOC && !this.isLocPaymentOptionSelected;
  }

  async closeActionSheet() {
    const actionSheet = await this.actionSheetCtrl.getTop();
    if (actionSheet) {
      actionSheet.dismiss();
    }
  }
}
