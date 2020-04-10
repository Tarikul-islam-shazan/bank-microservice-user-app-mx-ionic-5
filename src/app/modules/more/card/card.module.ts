import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { CardDetailsPage } from './card-details/container';
import { CardStatusPage } from './card-status/container';
import { CardLostPage } from './card-lost/container';
import { CardReplacePage } from './card-replace/container';
import { CardPinPage } from './card-pin/container';
import { CardRoutingModule } from './card-routing.module';
import { CARD_DETAILS_FACADE_SERVICE } from './card-details/facade';
import { CARD_STATUS_FACADE_SERVICE } from './card-status/facade';
import { CARD_LOST_FACADE_SERVICE } from './card-lost/facade';
import { CARD_REPLACE_FACADE_SERVICE } from './card-replace/facade';
import { CARD_PIN_FACADE_SERVICE } from './card-pin/facade';

@NgModule({
  imports: [CardRoutingModule, SharedModule],
  declarations: [CardDetailsPage, CardStatusPage, CardLostPage, CardReplacePage, CardPinPage],
  providers: [
    ...CARD_DETAILS_FACADE_SERVICE,
    ...CARD_STATUS_FACADE_SERVICE,
    ...CARD_LOST_FACADE_SERVICE,
    ...CARD_PIN_FACADE_SERVICE,
    ...CARD_REPLACE_FACADE_SERVICE
  ]
})
export class CardPageModule {}
