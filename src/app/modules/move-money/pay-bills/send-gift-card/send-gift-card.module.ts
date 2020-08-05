import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { SendGiftCardPage } from './container/send-gift-card.page';
import { SendGiftCardFacade } from './facade';

@NgModule({
  exports: [SendGiftCardPage],
  imports: [SharedModule],
  entryComponents: [SendGiftCardPage],
  providers: [SendGiftCardFacade],
  declarations: [SendGiftCardPage]
})
export class SendGiftCardPageModule {}
