import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardPage } from './container/gift-card.page';
import { SharedModule } from '@app/shared/shared.module';
import { GiftCardFacade } from './facade';

@NgModule({
  exports: [GiftCardPage],
  imports: [SharedModule],
  entryComponents: [GiftCardPage],
  providers: [GiftCardFacade],
  declarations: [GiftCardPage]
})
export class GiftCardPageModule {}
