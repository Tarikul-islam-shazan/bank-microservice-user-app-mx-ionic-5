import { NgModule } from '@angular/core';
import { MeedCoverPageRoutingModule } from './meed-cover-routing.module';
import { MeedCoverPage } from './container/meed-cover.page';
import { MEED_COVER_FACADE_SERVICE } from './facade';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, MeedCoverPageRoutingModule],
  declarations: [MeedCoverPage],
  providers: [...MEED_COVER_FACADE_SERVICE]
})
export class MeedCoverPageModule {}
