import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { RegistrationFeePaymentType } from '@app/core';
import { DirectDepositMoney } from '../facade';
import { ModalService, IMeedModalContent } from '@app/shared';
@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss']
})
export class MoneyPage implements OnInit {
  registrationFeePaymentType = RegistrationFeePaymentType;
  // GMA-4697; Muntaqeem; The first option should be selected by default
  moveMoneyOption = this.registrationFeePaymentType.ECHECK;
  constructor(private modalService: ModalService, private router: Router, private facade: DirectDepositMoney) {}

  ngOnInit() {}
  async openCheckModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.deposit-money-page.eCheck.title',
          details: [
            'info-modal-module.deposit-money-page.eCheck.details.content1',
            'info-modal-module.deposit-money-page.eCheck.details.content2'
          ]
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
  async openCreditModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.deposit-money-page.credit.title',
          details: ['info-modal-module.deposit-money-page.credit.details.content1']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  async openEtransferModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.deposit-money-page.eTransfer.title',
          details: [`info-modal-module.deposit-money-page.eTransfer.details.content1`]
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
  precessMoneyInput() {
    if (this.moveMoneyOption === this.registrationFeePaymentType.ACH) {
      this.openEtransferModal();
    } else {
      this.facade.moveOn(this.moveMoneyOption);
    }
  }
}
