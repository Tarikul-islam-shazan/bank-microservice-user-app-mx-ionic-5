import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Offer } from '@app/core';

@Component({
  selector: 'offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;
  @Output() OfferClick = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  goToOffer(offer: Offer) {
    this.OfferClick.emit(offer);
  }
}
