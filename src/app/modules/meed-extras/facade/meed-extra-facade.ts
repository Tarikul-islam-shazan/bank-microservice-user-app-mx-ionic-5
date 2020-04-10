import { Injectable } from '@angular/core';
import { MeedExtraService } from '../services/meed-extra.service';
import { Category, Offer, OfferDetails } from '@app/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ExtraIntroModalComponent } from '../components';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class MeedExtraFacade {
  constructor(
    private meedExtraService: MeedExtraService,
    private router: Router,
    private modalCtrl: ModalController,
    private analytics: AnalyticsService
  ) {}

  loadCategory(): Observable<Category[]> {
    return this.meedExtraService.categories;
  }

  loadFeaturedOffer(): Observable<Offer[]> {
    return this.meedExtraService.featuredOffers;
  }

  setCategory(category: Category): void {
    this.meedExtraService.category = category;
    this.analytics.logEvent(AnalyticsEventTypes.ExtrasCategorySelected, { category });
    this.router.navigate(['/meed-extras/categories-offer']);
  }

  setOffer(offer: Offer): void {
    this.meedExtraService.offer = offer;
    this.analytics.logEvent(AnalyticsEventTypes.OfferViewed, { name: offer.merchant, value: offer.title });
    if (offer.shopType === 'online') {
      this.router.navigate(['/meed-extras/online-offer']);
    } else if (offer.shopType === 'instore') {
      this.router.navigate(['/meed-extras/instore-offer']);
    }
  }

  goToSearch() {
    this.router.navigate(['/meed-extras/search-offers']);
  }

  async openExtraIntroModal() {
    const extraModal = await this.modalCtrl.create({
      component: ExtraIntroModalComponent
    });
    extraModal.present();
  }

  goToNearbyOffersPage() {
    this.analytics.logEvent(AnalyticsEventTypes.NearbyOffersSelected);
    this.router.navigate(['/meed-extras/nearby-offers']);
  }

  goToAllOffer() {
    this.analytics.logEvent(AnalyticsEventTypes.AllOfferSelected);
    this.router.navigate(['/meed-extras/all-offers']);
  }
}
