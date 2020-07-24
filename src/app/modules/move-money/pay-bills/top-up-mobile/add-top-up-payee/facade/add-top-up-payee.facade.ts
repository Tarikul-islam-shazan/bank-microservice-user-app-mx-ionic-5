import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { IBillPayee, IBiller } from '@app/core';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class AddTopUpPayeeFacade {
  constructor(
    private analyticsService: AnalyticsService,
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router
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
    billPayee._id = '1245678910';
    this.modalService.openModal(
      SuccessModalPage,
      this.getAddPayeeSuccessModalCompProps(billPayee.biller.name, billPayee._id)
    );
  }

  private getAddPayeeSuccessModalCompProps(billerName: string, referenceNumber: string): IMeedModalContent {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.add-top-up-payee.modal.title',
          reference: 'move-money-module.pay-bills.add-top-up-payee.modal.reference',
          values: { billerName, referenceNumber }
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.add-top-up-payee.modal.btn-pay-bill',
          cssClass: 'white-button',
          handler: () => {
            this.payBillService.billPayee = this.getBillPayee();
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
