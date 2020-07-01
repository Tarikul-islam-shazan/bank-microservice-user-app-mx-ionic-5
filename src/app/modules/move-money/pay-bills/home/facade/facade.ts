import { Injectable } from '@angular/core';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { PayBillsOptions } from '@app/move-money/pay-bills/models';
import { Router } from '@angular/router';
@Injectable()
export class PayBillsHomeFacade {
  paybillsOption: PayBillsOptions = PayBillsOptions.BillPay;
  constructor(private modalService: ModalService, private router: Router) {}

  async topUpMobileModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.top-up-mobile-modal.title',
          details: ['move-money-module.pay-bills.top-up-mobile-modal.details']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  get paybillsOptions(): typeof PayBillsOptions {
    return PayBillsOptions;
  }

  async billPayServiceModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.bill-pay-service-modal.title',
          details: ['move-money-module.pay-bills.bill-pay-service-modal.details']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  async giftCardModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.gift-card-modal.title',
          details: ['move-money-module.pay-bills.gift-card-modal.details']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  continue(): void {
    switch (this.paybillsOption) {
      case PayBillsOptions.BillPay:
        this.router.navigate(['/move-money/pay-bills/bill-pay']);
        break;
      case PayBillsOptions.TopUpMobile:
        // this.router.navigate(['/move-money/pay-bills/top-up-mobile']);
        break;
      case PayBillsOptions.GiftCard:
        // this.router.navigate(['/move-money/pay-bills/gift-card']);
        break;
    }
  }
}
