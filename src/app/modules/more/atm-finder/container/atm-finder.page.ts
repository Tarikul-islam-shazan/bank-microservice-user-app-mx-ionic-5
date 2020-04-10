import { Component } from '@angular/core';
import { AtmFinderFacade } from '../facade';

@Component({
  selector: 'mbc-atm-finder',
  templateUrl: './atm-finder.page.html',
  styleUrls: ['./atm-finder.page.scss']
})
export class AtmFinderPage {
  selectedTab = 'map';

  constructor(public facade: AtmFinderFacade) {}

  ionViewWillEnter() {
    this.facade.getNearestAtms();
  }

  switchTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
