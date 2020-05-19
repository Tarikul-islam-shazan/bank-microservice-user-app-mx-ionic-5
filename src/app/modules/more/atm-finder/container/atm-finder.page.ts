import { Component, OnInit } from '@angular/core';
import { AtmFinderFacade } from '../facade';

@Component({
  selector: 'mbc-atm-finder',
  templateUrl: './atm-finder.page.html',
  styleUrls: ['./atm-finder.page.scss']
})
export class AtmFinderPage implements OnInit {
  selectedTab = 'map';

  constructor(public facade: AtmFinderFacade) {}

  async ngOnInit() {
    await this.facade.checkLocationResume();
  }

  ionViewWillEnter() {
    this.facade.getNearestAtms();
  }

  ionViewDidEnter() {
    this.facade.viewDidEnter();
  }

  switchTab(tabName: string) {
    this.selectedTab = tabName;
  }

  ionViewWillLeave() {
    this.facade.willLeave();
  }
}
