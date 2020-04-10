import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { MeedSharePageRoutingModule } from './meed-share-routing.module';

import { MeedSharePage } from './container/';
import { MEED_SHARE_COMPONENTS } from './components';
import { MEED_SHARE_SERVICE } from './services';
import { MEED_SHARE_FACADE_SERVICE } from './facade';

@NgModule({
  imports: [SharedModule, MeedSharePageRoutingModule],
  declarations: [MeedSharePage, ...MEED_SHARE_COMPONENTS],
  exports: [...MEED_SHARE_COMPONENTS],
  providers: [...MEED_SHARE_FACADE_SERVICE, MEED_SHARE_SERVICE]
})
export class MeedSharePageModule {}
