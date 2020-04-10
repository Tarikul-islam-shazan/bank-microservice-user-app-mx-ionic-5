import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MeedExtrasPageRoutingModule } from './meed-extras-routing.module';
import { MeedExtrasPage } from './container/';
import { MEED_EXTRA_FACADE_SERVICE } from './facade';
import { MEED_EXTRA_SERVICE } from './services';
import { AllOffersPage } from './all-offers/container';
import { CategoriesOfferPage } from './categories-offer/container';
import { MEED_EXTRAS_COMPONENTS } from './components/';
import { OnlineOfferPage } from './online-offer/container/online-offer.page';
import { InstoreOfferPage } from './instore-offer/container';
import { SearchOffersPage } from './search-offers/container';
import { NearbyOfferPage } from './nearby-offer/container';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ALL_OFFERS_FACADE_SERVICE } from './all-offers/facade';
import { CATEGORIES_OFFER_FACADE_SERVICE } from './categories-offer/facade';
import { INSTORE_OFFER_FACADE_SERVICE } from './instore-offer/facade';
import { ONLINE_OFFER_FACADE_SERVICE } from './online-offer/facade';
import { SEARCH_OFFERS_FACADE_SERVICE } from './search-offers/facade';
import { NEARBY_OFFER_FACADE_SERVICE } from './nearby-offer/facade';

@NgModule({
  imports: [SharedModule, MeedExtrasPageRoutingModule],
  entryComponents: [...MEED_EXTRAS_COMPONENTS],
  declarations: [
    MeedExtrasPage,
    ...MEED_EXTRAS_COMPONENTS,
    AllOffersPage,
    CategoriesOfferPage,
    OnlineOfferPage,
    InstoreOfferPage,
    SearchOffersPage,
    NearbyOfferPage
  ],
  exports: [...MEED_EXTRAS_COMPONENTS],
  providers: [
    ...MEED_EXTRA_FACADE_SERVICE,
    ...ALL_OFFERS_FACADE_SERVICE,
    ...CATEGORIES_OFFER_FACADE_SERVICE,
    ...INSTORE_OFFER_FACADE_SERVICE,
    ...ONLINE_OFFER_FACADE_SERVICE,
    ...SEARCH_OFFERS_FACADE_SERVICE,
    ...NEARBY_OFFER_FACADE_SERVICE,
    MEED_EXTRA_SERVICE,
    InAppBrowser,
    Geolocation,
    NativeGeocoder
  ]
})
export class MeedExtrasPageModule {}
