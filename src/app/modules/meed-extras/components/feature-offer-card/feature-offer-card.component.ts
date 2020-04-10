import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'feature-offer-card',
  templateUrl: './feature-offer-card.component.html',
  styleUrls: ['./feature-offer-card.component.scss']
})
export class FeatureOfferCardComponent implements OnInit {
  @Input() featuredOffer: Offer;
  constructor(public translateService: TranslateService) {}

  ngOnInit() {}

  getTranslation(key: string): Observable<string> {
    return this.translateService.get(key);
  }
}
