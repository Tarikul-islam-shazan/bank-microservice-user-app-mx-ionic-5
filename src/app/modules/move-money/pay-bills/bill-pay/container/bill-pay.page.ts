import { BillPayFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { IBillPayee } from '@app/core';
@Component({
  selector: 'mbc-bill-pay',
  templateUrl: './bill-pay.page.html',
  styleUrls: ['./bill-pay.page.scss']
})
export class BillPayPage implements OnInit {
  searchQuery: string;
  constructor(public facade: BillPayFacade) {}

  ngOnInit() {
    this.facade.searchBillersInit();
  }

  ionViewWillEnter() {
    this.searchQuery = '';
    this.facade.getMyBillAccoutns();
  }

  goToBillPayment(billPayee: IBillPayee) {
    this.facade.goToBillPayment(billPayee);
  }

  searchBillers() {
    if (this.searchQuery) {
      this.facade.searchBillers$.next(this.searchQuery);
    } else {
      this.facade.searching = false;
      this.facade.billers = [];
    }
  }
}
