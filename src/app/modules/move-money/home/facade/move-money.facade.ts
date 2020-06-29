import { Injectable } from '@angular/core';
import { IMember, MemberService, ErrorService, InternalTransferService } from '@app/core';
import { MemberAccountStatus } from '@app/core/models/dto/member';
import { AccountService } from '@app/core/services/account.service';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { MoveMoneyItem } from '@app/move-money/home/models';
import { ModalService, IMeedModalComponentProps } from '@app/shared/services/modal.service';
import { Router } from '@angular/router';

@Injectable()
export class MoveMoneyFacade {
  moveMoneyLists: MoveMoneyItem[] = [];
  constructor(
    private memberService: MemberService,
    private accountService: AccountService,
    private modalService: ModalService,
    private router: Router,
    private errorService: ErrorService,
    private internalTransferService: InternalTransferService
  ) {
    this.initMoveMoneyList();
  }

  get member(): IMember {
    return this.memberService.member;
  }

  get menuList(): MoveMoneyItem[] {
    return this.moveMoneyLists;
  }

  initMoveMoneyList() {
    this.moveMoneyLists = [
      {
        optionName: 'move-money-module.home-page.move-money',
        options: [
          {
            iconClass: 'img-direct-deposit',
            itemName: 'move-money-module.home-page.menu.direct-deposit',
            appSuppress: 'DirectDeposit',
            onClick: () => {
              this.router.navigate(['/move-money/deposit/direct-deposit-info']);
            }
          },
          {
            iconClass: 'img-transfer-from-other-bank',
            itemName: 'move-money-module.home-page.menu.transfer-from-other-banks',
            appSuppress: 'TransferFromOtherBanks',
            onClick: () => {
              this.router.navigate(['/move-money/transfer-from-other-bank']);
            }
          },
          {
            iconClass: 'img-transfer-from-other-bank',
            itemName: 'move-money-module.home-page.menu.oxxo-money-deposit',
            appSuppress: 'OxxoMoneyDeposit',
            onClick: () => {
              this.creditCheckingBeforeDeposit('/move-money/oxxo-money-deposit');
            }
          }
        ]
      },
      {
        optionName: 'move-money-module.home-page.transfer-money',
        options: [
          {
            iconClass: 'img-send-money',
            itemName: 'move-money-module.home-page.menu.send-money',
            appSuppress: 'SendMoney',
            onClick: () => {
              this.router.navigate(['/p2p']);
            }
          },
          {
            iconClass: 'img-request-money',
            itemName: 'move-money-module.home-page.menu.request-money',
            appSuppress: 'RequestMoney',
            onClick: () => {
              this.router.navigate(['/move-money/request-money']);
            }
          },
          {
            iconClass: 'img-send-money-internationally',
            itemName: 'move-money-module.home-page.menu.send-money-internationally',
            appSuppress: 'SendMoneyInternationally',
            onClick: () => {
              this.router.navigate(['/move-money/send-money-internationally']);
            }
          },
          {
            iconClass: 'img-move-between-accounts',
            itemName: 'move-money-module.home-page.menu.move-between-accounts',
            appSuppress: 'MoveBetweenAccounts',
            onClick: () => {
              // Setting Account transfer form and to Acccount Type
              this.internalTransferService.formAccountType = AccountType.DDA;
              this.internalTransferService.toAccountType = AccountType.SSA;
              this.router.navigate(['/move-money/internal-transfer']);
            }
          },
          {
            iconClass: 'img-schedule-transfer',
            itemName: 'move-money-module.home-page.menu.scheduled-transfers',
            appSuppress: 'ScheduledTransfers',
            onClick: () => {
              this.router.navigate(['/move-money/internal-transfer/scheduled-transfers']);
            }
          },
          {
            iconClass: 'img-pay-bills',
            itemName: 'move-money-module.home-page.menu.pay-bills',
            appSuppress: 'PayBills',
            onClick: () => {
              this.router.navigate(['/move-money/pay-bills']);
            }
          },
          {
            iconClass: 'img-mail-a-check',
            itemName: 'move-money-module.home-page.menu.mail-a-check',
            appSuppress: 'MailACheck',
            onClick: () => {
              this.router.navigate(['/move-money/mail-check']);
            }
          },
          {
            iconClass: 'img-transfer-to-other-bank',
            itemName: 'move-money-module.home-page.menu.transfer-to-other-banks',
            appSuppress: 'TransferToOtherBanks',
            onClick: () => {
              this.featureComingSoon();
            }
          }
        ]
      }
    ];
    return this.moveMoneyLists;
  }

  async featureComingSoon() {
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'info-modal-module.coming-soon-feature.title',
            details: ['info-modal-module.coming-soon-feature.details']
          }
        ],
        actionButtons: [
          {
            text: 'info-modal-module.coming-soon-feature.okay-button-text',
            cssClass: 'white-button',
            handler: async () => {
              await this.modalService.close();
            }
          }
        ]
      }
    };
    await this.modalService.openInfoModalComponent(modalComponentContent);
  }
  // checks if the DDA account has exceeded the limit
  checkCreditLimitExceeded(): boolean {
    const accounts = this.accountService.getCachedAccountSummary() as IAccount[];
    const ddaAccount = accounts.find((account: IAccount) => account.accountType === AccountType.DDA);
    return ddaAccount.creditLimitExceeded;
  }

  creditCheckingBeforeDeposit(navigateTo: string) {
    if (this.member.accountStatus === MemberAccountStatus.Closed) {
      /***
       * Fix: GMA-4140
       * Logly UI error response add
       */
      this.errorService.sendError(new Error('User account has been closed'));
      this.closeAccountInfoModal();
    } else if (this.checkCreditLimitExceeded()) {
      this.errorService.sendError(new Error('Check Credit Limit Exceeded for this user'));
      this.creditLimitExceededModal();
    } else {
      this.openCreditDebitCardConfirmationModal(navigateTo);
    }
  }

  // account close status info modal
  async closeAccountInfoModal() {
    const componentProps: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            details: ['info-modal-module.close-account-echeck-card-info.detail']
          }
        ],
        actionButtons: [
          {
            text: 'info-modal-module.close-account-echeck-card-info.button-text',
            cssClass: 'white-button',
            handler: async () => {
              await this.modalService.close();
            }
          }
        ]
      }
    };
    await this.modalService.openInfoModalComponent(componentProps);
  }
  async openCreditDebitCardConfirmationModal(navigateTo: string) {
    const componentProps: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'info-modal-module.please-note.title',
            details: ['info-modal-module.please-note.details.content1']
          }
        ],
        actionButtons: [
          {
            text: 'info-modal-module.please-note.buttons.button1',
            cssClass: 'white-button',
            handler: async () => {
              await this.modalService.close(); // using modal close function instead of deprecated function
              await this.router.navigate([navigateTo]);
            }
          },
          {
            text: 'info-modal-module.please-note.buttons.button2',
            cssClass: 'grey-outline-button',
            handler: async () => {
              await this.modalService.close(); // using modal close function instead of deprecated function
            }
          }
        ]
      }
    };
    await this.modalService.openInfoModalComponent(componentProps);
  }

  /**
   * Issue: GMA-4362
   * Details:  Paystand internal funding transactions are not monitored by Meed and user is able to make more than 1 transaction per day.
   * Moreover, this modal only appears when a user has exceeded the credit limit.
   * added the limit list according the message provided
   * Date: February 14, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  async creditLimitExceededModal() {
    const componentProps: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'info-modal-module.deposit-money-page.move-money-page.info.title',
            details: [
              'info-modal-module.deposit-money-page.move-money-page.info.details.content-list',
              'info-modal-module.deposit-money-page.move-money-page.info.details.content-description'
            ]
          }
        ],
        actionButtons: [
          {
            text: 'info-modal-module.deposit-money-page.move-money-page.info.buttons.continue-button',
            cssClass: 'white-button',
            handler: async () => {
              await this.modalService.close();
            }
          }
        ]
      }
    };
    await this.modalService.openInfoModalComponent(componentProps);
  }
}
