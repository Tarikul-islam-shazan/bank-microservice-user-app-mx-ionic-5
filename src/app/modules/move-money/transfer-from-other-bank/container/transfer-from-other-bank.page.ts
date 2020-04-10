import { Component, OnInit } from '@angular/core';
import { RegistrationFeePaymentType, MemberAccountStatus } from '@app/core';
import { TransferFromOtherBankFacade } from '../facade';
import { ModalService, IMeedModalContent } from '@app/shared';

/**
 * * Issue: GMA-4420
 * * Issue Details: eCheck: Implement modal for closed status user.
 * * Developer Feedback: modal implemented for close status account
 * Date: February 19, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

@Component({
  selector: 'mbc-transfer-from-other-bank',
  templateUrl: './transfer-from-other-bank.page.html',
  styleUrls: ['./transfer-from-other-bank.page.scss']
})
export class TransferFromOtherBankPage implements OnInit {
  isVisiblePayStand = false;
  registrationFeePaymentType = RegistrationFeePaymentType;
  transferOption = RegistrationFeePaymentType.ECHECK;
  constructor(private modalService: ModalService, private facade: TransferFromOtherBankFacade) {}

  ngOnInit() {}

  async openCheckModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.eCheck-from-other-bank.title',
          details: [
            'info-modal-module.eCheck-from-other-bank.details.content1',
            'info-modal-module.eCheck-from-other-bank.details.content2'
          ]
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
  async openETransferModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.eTransfer-from-other-bank.title',
          details: ['info-modal-module.eTransfer-from-other-bank.details.content1']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  continue() {
    // if user account status is closed then its show info modal
    if (this.facade.member.accountStatus === MemberAccountStatus.Closed) {
      this.closeAccountInfoModal();
    } else if (this.facade.checkCreditLimitExceeded()) {
      this.creditLimitExceededModal();
    } else {
      this.isVisiblePayStand = true;
      this.initPayStand();
    }
  }

  initPayStand() {
    this.facade.initPayStandService();
  }

  ionViewWillLeave() {
    this.facade.payStandViewportReset();
  }
  // account close status info modal
  async closeAccountInfoModal() {
    const componentProps = {
      contents: [
        {
          details: ['info-modal-module.close-account-echeck-card-info.detail']
        }
      ],
      actionButtons: [
        {
          text: 'info-modal-module.close-account-echeck-card-info.button-text',
          cssClass: 'white-button',
          handler: (event: any) => {
            this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
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
    const componentProps: IMeedModalContent = {
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
          handler: () => {
            this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
