import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { IBillPayee, IBiller } from '@app/core';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class EditPayeeFacade {
  constructor(
    private analyticsService: AnalyticsService,
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router
  ) {}

  /**
   * @summary gets payee info from service
   *
   * @returns {IBillPayee}
   * @memberOf EditPayeeFacade
   */
  getBillPayee(): IBillPayee {
    return this.payBillService.billPayee;
  }

  /**
   * @summary naviagtes to payee address page.
   *
   * @param {IBillPayee} billPayee
   * @returns {void}
   * @memberOf EditPayeeFacade
   */
  continue(billPayee: IBillPayee): void {
    this.payBillService.billPayee = billPayee;
    this.payBillService.updatePayee(billPayee).subscribe(payee => {
      // show success modal
      this.modalService.openModal(SuccessModalPage, this.getEditPayeeSuccessModalCompProps(billPayee.biller.name));
    });
  }

  private getEditPayeeSuccessModalCompProps(billerName: string): IMeedModalContent {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.edit-payee.modal.title',
          values: { billerName }
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.edit-payee.modal.btn-pay-bill',
          cssClass: 'white-button',
          handler: () => {
            this.payBillService.billPayee = this.getBillPayee();
            this.navigateToPage('/move-money/pay-bills/bill-payment');
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.pay-bills.edit-payee.modal.btn-view-bill-account',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.navigateToPage('/move-money/pay-bills/bill-pay');
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
   * @memberOf EditPayeeFacade
   */
  private navigateToPage(pageToNavigate: string): void {
    this.router.navigate([pageToNavigate]);
  }
}
