import { NgModule } from '@angular/core';

import { Contacts } from '@meed-native/contacts/ngx';

import { SharedModule } from '@app/shared';
import { InviteRoutingModule } from './invite-routing.module';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
import { ChooseContactModule } from './invite-new-member/choose-contact/choose-contact.module';
import { InvitePage } from './container/invite.page';

import { INVITE_SERVICE } from './services';
import { INVITE_FACADE } from './facade';
import { INVITE_NEW_MEMBER_FACADE } from './invite-new-member/facade';
import { INVITE_NEW_MEMBER_VERIFY_FACADE } from './invite-new-member-verify/facade';
import { INVITE_NEW_MEMBER_CONFIRM_FACADE } from './invite-new-member-confirm/facade';

@NgModule({
  declarations: [InvitePage],
  imports: [SharedModule, InviteRoutingModule, SuccessModalPageModule, ChooseContactModule],
  providers: [
    Contacts,
    ...INVITE_SERVICE,
    ...INVITE_FACADE,
    ...INVITE_NEW_MEMBER_FACADE,
    ...INVITE_NEW_MEMBER_VERIFY_FACADE,
    ...INVITE_NEW_MEMBER_CONFIRM_FACADE
  ]
})
export class InviteModule {}
