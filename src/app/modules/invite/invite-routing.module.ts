import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitePage } from './container/invite.page';

const routes: Routes = [
  {
    path: '',
    component: InvitePage
  },
  {
    path: 'invite-new-member',
    loadChildren: () => import('./invite-new-member/invite-new-member.module').then(m => m.InviteNewMemberPageModule)
  },
  {
    path: 'invite-new-member-verify',
    loadChildren: () =>
      import('./invite-new-member-verify/invite-new-member-verify.module').then(m => m.InviteNewMemberVerifyPageModule)
  },
  {
    path: 'invite-new-member-confirm',
    loadChildren: () =>
      import('./invite-new-member-confirm/invite-new-member-confirm.module').then(
        m => m.InviteNewMemberConfirmPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteRoutingModule {}
