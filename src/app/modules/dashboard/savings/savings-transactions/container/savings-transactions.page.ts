import { Component, OnInit } from '@angular/core';
import { SavingTransactionsFacade } from '../facade/saving-transactions-facade';

@Component({
  selector: 'app-savings-transactions',
  templateUrl: './savings-transactions.page.html',
  styleUrls: ['./savings-transactions.page.scss']
})
export class SavingsTransactionsPage implements OnInit {
  constructor(public savingTransactionsFacade: SavingTransactionsFacade) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.savingTransactionsFacade.loadSavingTransactions();
  }

  selectTab(event: string) {
    this.savingTransactionsFacade.switchTab(event);
  }
}
