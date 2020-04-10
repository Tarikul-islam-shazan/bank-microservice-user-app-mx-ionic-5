import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteNewMemberPage } from './container/invite-new-member.page';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: InviteNewMemberPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [InviteNewMemberPage]
})
export class InviteNewMemberPageModule {}
