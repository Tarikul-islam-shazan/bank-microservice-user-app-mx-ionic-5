import { Component, OnInit } from '@angular/core';
import { TopUpMobileFacade } from '../facade/top-up-mobile.facade';

@Component({
  selector: 'mbc-top-up-mobile',
  templateUrl: './top-up-mobile.page.html',
  styleUrls: ['./top-up-mobile.page.scss']
})
export class TopUpMobilePage implements OnInit {
  searchQuery: string;
  constructor(public facade: TopUpMobileFacade) {}
  ngOnInit() {
    this.facade.searchTopUpProvidersInit();
  }

  ionViewWillEnter() {
    this.searchQuery = '';
    this.facade.getTopUpBillAccoutns();
  }

  searchTopUpProviders() {
    if (this.searchQuery) {
      this.facade.searchTopUpProviders$.next(this.searchQuery);
    } else {
      this.facade.searching = false;
      this.facade.topUpProviders = [];
    }
  }
}
