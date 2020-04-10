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
  constructor(private facade: BillPayFacade) {}

  ionViewWillEnter() {
    this.getPayeeList();
  }

  getPayeeList() {
    this.facade.getPayeeList().subscribe(_payees => {
      this.payeeList = _payees;
    });
  }
  addPayee() {
    this.facade.addPayee();
  }
  goToBillPayment(billPayee: IBillPayee) {
    this.facade.goToBillPayment(billPayee);
  }
}
