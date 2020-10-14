import { IBillPayee, IBiller } from '@app/core';
import { IMeedModalContent, ModalService, SuccessModalPage, PhonePipe } from '@app/shared';
import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class AddTopUpPayeeFacade {
  constructor(
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router,
    private phonePipe: PhonePipe
  ) {}

  /**
   *
   * @summary A function to return IBiller
   * @returns {IBiller}
   * @memberof AddTopUpPayeeFacade
   */
  getBiller(): IBiller {
    return this.payBillService.biller;
  }
  /**
   * @summary gets payee info from service
   *
   * @returns {IBillPayee}
   * @memberOf AddTopUpPayeeFacade
   */
  getBillPayee(): IBillPayee {
    return this.payBillService.billPayee;
  }

  /**
   * @summary naviagtes to payee address page.
   *
   * @param {IBillPayee} billPayee
   * @returns {void}
   * @memberOf AddTopUpPayeeFacade
   */
  continue(billPayee: IBillPayee): void {
    this.payBillService.billPayee.phoneNumber = billPayee.phoneNumber;
    this.payBillService.addTopUpPayee(billPayee).subscribe(payee => {
      // show success modal
      this.modalService.openModal(
        SuccessModalPage,
        this.getAddPayeeSuccessModalCompProps(billPayee.phoneNumber, payee.referenceId)
      );
    });
  }
  private getAddPayeeSuccessModalCompProps(phoneNumber: string, referenceNumber: string): IMeedModalContent {
    phoneNumber = this.phonePipe.transform(phoneNumber);
    const content = {
      title: 'move-money-module.pay-bills.add-top-up-payee.modal.title',
      values: { phoneNumber }
    };
    if (referenceNumber) {
      Object.assign(content, { reference: 'move-money-module.pay-bills.add-top-up-payee.modal.reference' });
      Object.assign(content.values, { referenceNumber });
    }
    const componentProps: IMeedModalContent = {
      contents: [content],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.add-top-up-payee.modal.btn-pay-bill',
          cssClass: 'white-button',
          handler: () => {
            this.payBillService.billPayee = this.getBillPayee();
            this.payBillService.billPayee.biller = this.getBiller();
            this.navigateToPage('/move-money/pay-bills/top-up-payment');
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.pay-bills.add-top-up-payee.modal.btn-view-bill-account',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.navigateToPage('/move-money/pay-bills/top-up-mobile');
            this.modalService.close();
          }
        }
      ]
    };

    return componentProps;
  }

  /**
   * @summary navigates to the passed route
   *
   * @private
   * @param {string} pageToNavigate
   * @returns {void}
   * @memberOf AddTopUpPayeeFacade
   */
  private navigateToPage(pageToNavigate: string): void {
    this.router.navigate([pageToNavigate]);
  }
}
