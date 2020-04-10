import { Component, OnInit } from '@angular/core';
import { MeedExtraFacade } from '@app/meed-extras/facade';
import { Router } from '@angular/router';
import { Category, Offer, SettingsService } from '@app/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'meed-extras',
  templateUrl: './meed-extras.page.html',
  styleUrls: ['./meed-extras.page.scss']
})
export class MeedExtrasPage implements OnInit {
  feturedSlideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2
  };

  categoriesSlideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 4
  };

  featuredOffers$: Observable<Offer[]>;
  categories$: Observable<Category[]>;
  constructor(public meedExtraFacade: MeedExtraFacade, private settingService: SettingsService) {}

  ngOnInit() {
    if (!this.settingService.getSettings().userSettings.meedExtraInfoNotShow) {
      this.meedExtraFacade.openExtraIntroModal();
    }
  }

  ionViewWillEnter() {
    this.featuredOffers$ = this.meedExtraFacade.loadFeaturedOffer();
    this.categories$ = this.meedExtraFacade.loadCategory();
  }

  goToAllOffer() {
    this.meedExtraFacade.goToAllOffer();
  }

  goToNearbyOffersPage() {
    this.meedExtraFacade.goToNearbyOffersPage();
  }

  setOffer(featuredOffer) {
    this.meedExtraFacade.setOffer(featuredOffer);
  }

  setCategory(category) {
    this.meedExtraFacade.setCategory(category);
  }
}
