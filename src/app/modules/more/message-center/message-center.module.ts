import { NgModule } from '@angular/core';
import { MessageCenterPageRoutingModule } from './message-center-routing.module';
import { MessageCenterPage } from './container/message-center.page';
import { MESSAGE_CENTER_FACADE } from './facade';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [SharedModule, MessageCenterPageRoutingModule],
  declarations: [MessageCenterPage],
  providers: [...MESSAGE_CENTER_FACADE]
})
export class MessageCenterPageModule {}
