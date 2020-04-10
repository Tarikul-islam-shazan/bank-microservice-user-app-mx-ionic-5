import { Injectable } from '@angular/core';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { PayBillsOptions } from '@app/move-money/pay-bills/models';
import { Router } from '@angular/router';
@Injectable()
export class PayBillsHomeFacade {
  paybillsOption: PayBillsOptions = PayBillsOptions.BillerDirect;
  constructor(private modalService: ModalService, private router: Router) {}

  async billerDirectModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.biller-direct-modal.title',
          details: ['move-money-module.pay-bills.biller-direct-modal.details']
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

  async cardSwapModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.card-swap-modal.title',
          details: ['move-money-module.pay-bills.card-swap-modal.details']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  continue(): void {
    switch (this.paybillsOption) {
      case PayBillsOptions.BillerDirect:
        this.router.navigate(['/move-money/pay-bills/biller-direct']);
        break;
      case PayBillsOptions.BillPay:
        this.router.navigate(['/move-money/pay-bills/bill-pay']);
        break;
      case PayBillsOptions.CardSwap:
        this.router.navigate(['/move-money/pay-bills/card-swap']);
        break;
    }
  }
}
