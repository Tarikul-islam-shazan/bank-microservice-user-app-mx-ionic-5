import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { CardDetailsPage } from './card-details/container';
import { CardStatusPage } from './card-status/container';
import { CardLostPage } from './card-lost/container';
import { CardPinPage } from './card-pin/container';
import { CardReplacePage } from './card-replace/container';

const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.CARD_DETAILS.NAME },
    component: CardDetailsPage
  },
  {
    path: 'card-status',
    data: { title: PAGES.CARD_STATUS.NAME },
    component: CardStatusPage
  },
  {
    path: 'card-lost',
    data: { title: PAGES.CARD_LOST.NAME },
    component: CardLostPage
  },
  {
    path: 'card-pin',
    data: { title: PAGES.CARD_PIN.NAME },
    component: CardPinPage
  },
  {
    path: 'card-replace',
    data: { title: PAGES.CARD_REPLACE.NAME },
    component: CardReplacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule {}
