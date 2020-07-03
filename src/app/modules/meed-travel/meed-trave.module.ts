import { NgModule } from '@angular/core';
import { MeedTravelPageRoutingModule } from './meed-travel-routing.module';
import { MeedTravelPage } from './container/meed-travel.page';
import { MEED_TRAVEL_FACADE_SERVICE } from './facade';
import { SharedModule } from '@app/shared';
import { WebsitePage } from './third-party-website/container/third-party-website.page';

@NgModule({
  imports: [SharedModule, MeedTravelPageRoutingModule],
  declarations: [MeedTravelPage, WebsitePage],
  providers: [...MEED_TRAVEL_FACADE_SERVICE]
})
export class MeedTravelPageModule {}
