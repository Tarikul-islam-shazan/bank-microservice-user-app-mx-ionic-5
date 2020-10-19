import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { Offer, OfferDetails } from '@app/core';
import { Observable } from 'rxjs';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class InstoreOfferFacade {
  constructor(private meedExtraService: MeedExtraService, private readonly analyticsService: AnalyticsService) {}

  get offer(): Offer {
    return this.meedExtraService.offer;
  }

  loadOfferDetails(zipCode: string): Observable<OfferDetails> {
    const parms = {
      xid: this.meedExtraService.offer.id as string,
      zipcode: zipCode
    };
    this.analyticsService.logEvent(AnalyticsEventTypes.ZipSearchInitiated);
    return this.meedExtraService.getOfferDetails(parms);
  }

  activeOffer(): void {
    const params = {
      offerId: this.meedExtraService.offer.id as string
    };
    this.meedExtraService.activeOffer(params).subscribe(() => {
      this.analyticsService.logEvent(AnalyticsEventTypes.OfferActivated);
      const currentOffer = this.meedExtraService.offer;
      currentOffer.activated = true;
      this.meedExtraService.offer = currentOffer;
    });
  }
}
