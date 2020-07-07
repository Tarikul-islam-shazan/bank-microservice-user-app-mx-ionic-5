import { BillPayFacade } from '../facade';
import { Component } from '@angular/core';
import { IBillPayee } from '@app/core';

@Component({
  selector: 'mbc-bill-pay',
  templateUrl: './bill-pay.page.html',
  styleUrls: ['./bill-pay.page.scss']
})
export class BillPayPage {
  payeeList: IBillPayee[] = [];
  searchQuery: string;
  constructor(public facade: BillPayFacade) {}

  ionViewWillEnter() {
    this.searchQuery = '';
    this.facade.getBillers('');
    this.facade.getMyBillAccoutns();
  }

  goToBillPayment(billPayee: IBillPayee) {
    this.facade.goToBillPayment(billPayee);
  }

  searchBillers() {
    this.facade.searchBillers(this.searchQuery);
  }
}
