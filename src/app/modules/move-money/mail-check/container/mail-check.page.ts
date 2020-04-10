import { Component, OnInit } from '@angular/core';
import { MailCheckFacade } from '../facade';
import { IBillPayee } from '@app/core';

/**
 * * Mail a Check Feature Implemented
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 * Date: 6 Feb, 2020
 */
@Component({
  selector: 'mbc-bill-pay',
  templateUrl: './mail-check.page.html',
  styleUrls: ['./mail-check.page.scss']
})
export class MailCheckPage {
  payeeList: IBillPayee[] = [];
  constructor(private facade: MailCheckFacade) {}

  ionViewWillEnter() {
    this.getPayeeList();
  }

  /**
   * * Get The List of Payee
   * @function getPayeeList
   * @memberof MailCheckPage
   */
  getPayeeList() {
    this.facade.getPayeeList().subscribe(_payees => {
      this.payeeList = _payees;
    });
  }
  /**
   * * Add Payee
   * @function addPayee
   * @memberof MailCheckPage
   */
  addPayee() {
    this.facade.addPayee();
  }

  /**
   * * View or update the specific payee's Bill Payment
   * @function goToBillPayment
   * @memberof MailCheckPage
   */
  goToBillPayment(billPayee: IBillPayee) {
    this.facade.goToBillPayment(billPayee);
  }
}
