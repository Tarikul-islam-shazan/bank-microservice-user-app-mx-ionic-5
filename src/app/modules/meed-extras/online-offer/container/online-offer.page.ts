import { Component, OnInit } from '@angular/core';
import { OnlineOfferFacade } from '../facade';
import { Offer } from '@app/core';

@Component({
  selector: 'online-offer',
  templateUrl: './online-offer.page.html',
  styleUrls: ['./online-offer.page.scss']
})
export class OnlineOfferPage implements OnInit {
  _offer: Offer;
  constructor(public onlineOfferFacade: OnlineOfferFacade) {}

  ngOnInit() {
    this._offer = this.onlineOfferFacade.offer;
  }

  ionViewWillEnter() {}

  goToExternalLink() {
    this.onlineOfferFacade.gotoExternalLink();
  }
}
