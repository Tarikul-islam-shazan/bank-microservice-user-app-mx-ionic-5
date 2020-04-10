import { Component, OnInit } from '@angular/core';
import { CreditDebitCardFacade } from '../facade';

@Component({
  selector: 'mbc-credit-debit-card',
  templateUrl: './credit-debit-card.page.html',
  styleUrls: ['./credit-debit-card.page.scss']
})
export class CreditDebitCardPage implements OnInit {
  constructor(private facade: CreditDebitCardFacade) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.facade.initPayStandService();
  }
  ionViewWillLeave() {
    this.facade.payStandViewportReset();
  }
}
