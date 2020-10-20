import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { Offer } from '@app/core';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class OnlineOfferFacade {
  constructor(
    private meedExtraService: MeedExtraService,
    private iab: InAppBrowser,
    private readonly analyticsService: AnalyticsService
  ) {}

  get offer(): Offer {
    return this.meedExtraService.offer;
  }

  gotoExternalLink() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    };
    this.iab.create(this.offer.outsideLink, '_blank', options);
    this.analyticsService.logEvent(AnalyticsEventTypes.ExternalSiteViewed, { name: this.offer.merchant });
  }
}
