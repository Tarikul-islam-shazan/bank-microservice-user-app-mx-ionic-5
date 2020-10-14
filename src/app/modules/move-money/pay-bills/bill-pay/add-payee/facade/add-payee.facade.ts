import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { IBillPayee, IBiller } from '@app/core';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class AddPayeeFacade {
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
   * @memberof AddPayeeFacade
   */
  getBiller(): IBiller {
    return this.payBillService.biller;
  }
  /**
   * @summary gets payee info from service
   *
   * @returns {IBillPayee}
   * @memberOf AddPayeeFacade
   */
  getBillPayee(): IBillPayee {
    return this.payBillService.billPayee;
  }

  /**
   * @summary naviagtes to payee address page.
   *
   * @param {IBillPayee} billPayee
   * @returns {void}
   * @memberOf AddPayeeFacade
   */
  continue(billPayee: IBillPayee): void {
    this.payBillService.billPayee = { ...billPayee };
    const biller = billPayee.biller as IBiller;
    billPayee.biller = biller.id;
    this.payBillService.addPayee(billPayee).subscribe(payee => {
      // set payee id
      this.payBillService.billPayee._id = payee._id;
      // show success modal
      this.modalService.openModal(
        SuccessModalPage,
        this.getAddPayeeSuccessModalCompProps(biller.name, payee.referenceId)
      );
    });
  }

  private getAddPayeeSuccessModalCompProps(billerName: string, referenceNumber: string): IMeedModalContent {
    const content = {
      title: 'move-money-module.pay-bills.add-payee.modal.title',
      values: { billerName }
    };
    if (referenceNumber) {
      Object.assign(content, { reference: 'move-money-module.pay-bills.add-payee.modal.reference' });
      Object.assign(content.values, { referenceNumber });
    }
    const componentProps: IMeedModalContent = {
      contents: [content],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.add-payee.modal.btn-pay-bill',
          cssClass: 'white-button',
          handler: () => {
            this.payBillService.billPayee = this.getBillPayee();
            this.navigateToPage('/move-money/pay-bills/bill-payment');
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.pay-bills.add-payee.modal.btn-view-bill-account',
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
   * @memberOf AddPayeeFacade
   */
  private navigateToPage(pageToNavigate: string): void {
    this.router.navigate([pageToNavigate]);
  }
}
