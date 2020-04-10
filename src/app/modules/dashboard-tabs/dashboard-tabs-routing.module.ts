import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTabsPage } from './container/dashboard-tabs.page';
import { PAGES } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardTabsPage,
    children: [
      {
        path: 'home',
        data: { title: PAGES.DASHBOARD.NAME },
        children: [
          {
            path: '',
            loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
          }
        ]
      },
      {
        path: 'move-money',
        data: { title: PAGES.MOVE_MONEY.NAME },
        children: [
          {
            path: '',
            loadChildren: () => import('../move-money/move-money.module').then(m => m.MoveMoneyModule)
          }
        ]
      },
      {
        path: 'rewards',
        data: { title: PAGES.REWARDS.NAME },
        children: [
          {
            path: '',
            loadChildren: () => import('../rewards/rewards.module').then(m => m.RewardsModule)
          }
        ]
      },
      {
        path: 'invite',
        data: { title: PAGES.INVITE.NAME },
        children: [
          {
            path: '',
            loadChildren: () => import('../invite/invite.module').then(m => m.InviteModule)
          }
        ]
      },
      {
        path: 'more',
        data: { title: PAGES.MORE.NAME },
        children: [
          {
            path: '',
            loadChildren: () => import('../more/more.module').then(m => m.MoreModule)
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardTabsPageRoutingModule {}
