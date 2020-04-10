import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteNewMemberConfirmPage } from './container/invite-new-member-confirm.page';
import { SharedModule } from '@app/shared';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

const routes: Routes = [
  {
    path: '',
    component: InviteNewMemberConfirmPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), SuccessModalPageModule],
  declarations: [InviteNewMemberConfirmPage]
})
export class InviteNewMemberConfirmPageModule {}
