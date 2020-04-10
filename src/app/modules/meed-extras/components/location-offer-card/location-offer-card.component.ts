import { Component, OnInit, Input } from '@angular/core';
import { LocationOffer } from '@app/meed-extras/models/meed-extra';

@Component({
  selector: 'location-offer-card',
  templateUrl: './location-offer-card.component.html',
  styleUrls: ['./location-offer-card.component.scss']
})
export class LocationOfferCardComponent implements OnInit {
  @Input() locationOffer: LocationOffer;
  constructor() {}

  ngOnInit() {}
}
