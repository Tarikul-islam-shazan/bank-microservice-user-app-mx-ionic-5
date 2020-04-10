import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeedExtrasPage } from './container/';
import { PAGES } from '@app/core';
import { AllOffersPage } from './all-offers/container/all-offers.page';
import { CategoriesOfferPage } from './categories-offer/container';
import { OnlineOfferPage } from './online-offer/container';
import { InstoreOfferPage } from './instore-offer/container';
import { SearchOffersPage } from './search-offers/container';
import { NearbyOfferPage } from './nearby-offer/container';

const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.MEED_EXTRA.NAME },
    component: MeedExtrasPage
  },
  {
    path: 'all-offers',
    data: { title: PAGES.MEED_EXTRA_ALL_OFFERS.NAME },
    component: AllOffersPage
  },
  {
    path: 'categories-offer',
    data: { title: PAGES.MEED_CATEGORIES_OFFERS.NAME },
    component: CategoriesOfferPage
  },
  {
    path: 'online-offer',
    data: { title: PAGES.MEED_ONLINE_OFFERS.NAME },
    component: OnlineOfferPage
  },
  {
    path: 'instore-offer',
    data: { title: PAGES.MEED_INSTORE_OFFERS.NAME },
    component: InstoreOfferPage
  },
  {
    path: 'search-offers',
    data: { title: PAGES.MEED_INSTORE_OFFERS.NAME },
    component: SearchOffersPage
  },
  {
    path: 'nearby-offers',
    data: { title: PAGES.MEED_NEARBY_OFFERS.NAME },
    component: NearbyOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeedExtrasPageRoutingModule {}
