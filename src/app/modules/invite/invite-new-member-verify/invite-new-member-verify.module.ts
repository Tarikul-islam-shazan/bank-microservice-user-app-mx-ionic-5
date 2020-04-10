import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteNewMemberVerifyPage } from './container/invite-new-member-verify.page';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: InviteNewMemberVerifyPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [InviteNewMemberVerifyPage]
})
export class InviteNewMemberVerifyPageModule {}
