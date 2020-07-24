import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TopUpMobilePage } from './container/top-up-mobile.page';
import { TopUpMobileFacade } from './facade';

@NgModule({
  exports: [TopUpMobilePage],
  imports: [SharedModule],
  entryComponents: [TopUpMobilePage],
  providers: [TopUpMobileFacade],
  declarations: [TopUpMobilePage]
})
export class TopUpMobilePageModule {}
